import frappe
import json

@frappe.whitelist()
def get_userid():
    return frappe.session.user

# user name api --------------

# @frappe.whitelist()
# def get_test():
#     user_check=get_userid()
#     if user_check!="Administrator":
#         filters={'user': user_check}
#         supplier = frappe.db.get_all("Portal User", filters=filters, fields=['parent'])
#         # new_supplier = frappe.db.get_doc("Supplier")
#         # frappe.log_error("nb",new_supplier)

#         return supplier[0].parent if supplier else 'Guest'
#     return ''
import frappe
import json

@frappe.whitelist()
def get_userid():
    return frappe.session.user

@frappe.whitelist()
def get_test():
    user_check = get_userid()
    if user_check != "Administrator":
        # Fetching the supplier name based on email address
        query = frappe.db.sql("""
            SELECT S.supplier_name
            FROM `tabSupplier` S
            INNER JOIN `tabAddress` A ON A.name = S.supplier_primary_address
            WHERE A.email_id = %s
            AND A.disabled = 0
        """, (user_check,))
        
        # Check if any results were found and return the supplier name (assuming it's unique)
        if query:
            return query[0][0]  # Returning the supplier name
    return ''  # Return empty string if the user is Administrator or no match found

@frappe.whitelist()
def get_issues(**field_filters):
    my_data = get_test()
    filters = {}

    # Apply supplier filter if the user is a supplier
    if my_data:  # If my_data contains a supplier name, apply the filter
        filters['custom_supplier'] = my_data

    # Adding other filters from the request
    final_filter = json.loads(field_filters.get('field_filters', '{}'))

    if final_filter:
        for key, value in final_filter.items():
            if key != 'cmd' and value:  # Avoid empty filters
                filters[key] = value

    frappe.log_error("Filters applied:", filters)

    # Fetching the issues based on the filters
    issues = frappe.db.get_all("Issue", fields=['*'], filters=filters)
    return issues

# @frappe.whitelist()
# def get_test():
#     user_check=get_userid()
#     if user_check!="Administrator":
#         query = frappe.db.sql(f"""SELECT S.supplier_name
#                                 FROM `tabSupplier` S
#                                 INNER JOIN `tabAddress` A ON A.name = S.supplier_primary_address
#                                 WHERE A.email_id = '{user_check}'
#                                 AND A.disabled = 0""")
#         return query
#     return 'Admin'
    
# @frappe.whitelist()
# def get_issues(**field_filters):
#     my_data = get_test()
#     # Setting filters based on supplier data
#     # filters = {}
#     if my_data ='Admin':
#         filters = {}
#     elif my_data:
#         filters['custom_supplier'] = my_data
#     final_filter = json.loads(field_filters.get('field_filters'))
   
#     if final_filter != "":
#         for key, value in final_filter.items():
#             if key != 'cmd':
#                 if value:  # Only apply non-empty filters
#                     filters[key] = value

#             # frappe.log_error("issye",filters)
    
#     issues = frappe.db.get_all("Issue", fields=['*'], filters=filters)
#     return issues

@frappe.whitelist()
def get_quotation(**field_filters):
    my_data = get_test()
    # Setting filters based on supplier data
    filters = {}
    if my_data:
        filters['supplier'] = my_data
    final_filter = json.loads(field_filters.get('field_filters'))
    frappe.log_error("final_filter",final_filter)
    if final_filter != "":
        for key, value in final_filter.items():
            if key != 'cmd':
                if value :
                    if key =='vendor' :
                        filters['supplier'] = value
                        
                    else:  # Only apply non-empty filters
                        filters[key] = value
    # frappe.log_error("final_filter",quotations)
    quotations = frappe.db.get_all("Request for Quotation", fields=['*'], filters=filters)
    # supplier_item = frappe.db.get_all("Request for Quotation Supplier", fields=['*'])
    # quotation_items = frappe.db.get_all("Request for Quotation Item", fields=['*'])
    
    
    quotation_docs = []

    for quotation in quotations:
        supplier_item = frappe.db.get_all("Request for Quotation Supplier", fields=['*'],filters={"parent":quotation['name']})
        quotation_items = frappe.db.get_all("Request for Quotation Item", fields=['*'],filters={"parent":quotation['name']})
        # items = [item for item ni quotation_items if item["parent"] == quotation["name"]]
        # suppliers = [supplier for supplier in supplier_item if supplier["parent"] == quotation["name"]]
        
        quotation["items"] = quotation_items
        quotation["suppliers"] = supplier_item
        quotation_docs.append(quotation)
       
    return quotation_docs

@frappe.whitelist()
def get_purchaseorder(**field_filters):
    my_data = get_test()
    # Setting filters based on supplier data
    filters = {}
    if my_data:
        filters['supplier'] = my_data
    final_filter = json.loads(field_filters.get('field_filters'))
    
    if final_filter != "":
        for key, value in final_filter.items():
            if key != 'cmd':
                if value:  # Only apply non-empty filters
                    filters[key] = value
    
    # Fetching purchase orders and related items
    purchase_orders = frappe.db.get_all("Purchase Order", fields=['*'], filters=filters)
  
    purchase_order_docs = []

    # Loop through purchase orders and append items and taxes
    for order in purchase_orders:
        purchase_order_items = frappe.db.get_all("Purchase Order Item", fields=['*'],filters={"parent":order['name']})
        taxes_and_charges = frappe.db.get_all("Purchase Taxes and Charges", fields=['*'],filters={"parent":order['name']})
      
        order["items"] = purchase_order_items  # Add items to the purchase order
        order["taxes"] = taxes_and_charges  # Add taxes to the purchase order

        purchase_order_docs.append(order)

        # addtional_docs=purchase_order_docs
        # frappe.log_error('field_',addtional_docs)
    # purchase_order_docs = additional_data(addtional_docs)
    purchase_order_docs = additional_data(purchase_order_docs)

    return purchase_order_docs


# supplier quotation
@frappe.whitelist()
def get_supplierquotation(**field_filters):
    # Getting supplier data
    my_data = get_test()
    
    # Setting filters based on supplier data
    filters = {}
    if my_data:
        filters['supplier'] = my_data    
    final_filter = json.loads(field_filters.get('field_filters'))
    
    if final_filter != "":
        for key, value in final_filter.items():
            if key != 'cmd':
                if value:  # Only apply non-empty filters
                    filters[key] = value
    
    # Fetching supplier quotations and related items
    quotations = frappe.db.get_all("Supplier Quotation", fields=['*'], filters=filters)

    quotation_docs = []

    # Loop through quotations and append supplier items
    for quotation in quotations:
        supplier_items = frappe.db.get_all("Supplier Quotation Item", fields=['*'],filters={"parent":quotation['name']})
        taxes_and_charges = frappe.db.get_all("Purchase Taxes and Charges", fields=['*'],filters={"parent":quotation['name']})
        
        quotation["items"] = supplier_items  # Add items to the quotation
        quotation["taxes"] = taxes_and_charges  # Add taxes to the quotation

        quotation_docs.append(quotation)

    quotation_docs=additional_data(quotation_docs)

    return quotation_docs

# Purchase invoice
@frappe.whitelist()
def get_purchaseinvoice(**field_filters):
    my_data = get_test()
    # Setting filters based on supplier data
    filters = {}
    if my_data:
        filters['supplier'] = my_data
    
    final_filter = json.loads(field_filters.get('field_filters'))
    # frappe.log_error('final_filter ',final_filter)
    if final_filter != "":
        for key, value in final_filter.items():
            if key != 'cmd':
                if value:  # Only apply non-empty filters
                    filters[key] = value
    
    # Fetching purchase invoices and related items
    invoices = frappe.db.get_all("Supplier Invoice", fields=['*'], filters=filters)
    
    invoice_docs = []

    # Loop through invoices and associate invoice items and taxes
    for invoice  in invoices:
        invoice_items = frappe.db.get_all("Purchase Invoice Item", fields=['*'],filters={"parent":invoice['name']})
        taxes_and_charges = frappe.db.get_all("Purchase Taxes and Charges", fields=['*'],filters={"parent":invoice['name']})

        invoice["items"] = invoice_items  # Add items to the invoice

        invoice["taxes"] = taxes_and_charges  # Add taxes to the invoice

        invoice_docs.append(invoice)

    invoice_docs=additional_data(invoice_docs)
    
    return invoice_docs


@frappe.whitelist()
def get_address(**field_filters):
    
    my_data = get_test() 
  
    # Setting filters based on supplier data
    filters = {}
    # if my_data:
        # filters['supplier'] = my_data

    # frappe.log_error("types",type(field_filters))
    
    final_filter = json.loads(field_filters.get('field_filters'))
    # frappe.log_error('final_filter ',final_filter)
    if final_filter != "":
        for key, value in final_filter.items():
            if key != 'cmd':
                if value:  # Only apply non-empty filters
                    filters[key] = value
                
    address_list = []   

    addresses = frappe.db.get_all("Address", fields=['*'],filters=filters)
 
    for address in addresses:
        if my_data:
            filters = {'parent':address['name']}
        else:
            filters = {'link_doctype': 'Supplier'}    
       
        links = frappe.db.get_all("Dynamic Link", fields=['*'], filters=filters)
        address['links'] = links
        address_list.append(address)
 
    address_data = []
    for address in address_list:
        for link in address['links']:
            if link['link_name'] in my_data:
                address_data.append(address)
 
    return address_data if my_data else address_list

@frappe.whitelist()
def additional_data(addtional_docs):
    for quotation in addtional_docs:
        quotation['grand_total'] = frappe.utils.fmt_money(quotation.get('grand_total'), currency=quotation.get('currency'))
        quotation['total'] = frappe.utils.fmt_money(quotation.get('total'), currency=quotation.get('currency'))
        quotation['rounded_total'] = frappe.utils.fmt_money(quotation.get('rounded_total'), currency=quotation.get('currency'))
        quotation['total_taxes_and_charges'] = frappe.utils.fmt_money(quotation.get('total_taxes_and_charges'), currency=quotation.get('currency'))
        
        # Formatting dates
        quotation['posting_date'] = frappe.utils.formatdate(quotation.get('posting_date'), "dd-MM-yyyy")
        if quotation.get('due_date'):
            quotation['due_date'] = frappe.utils.formatdate(quotation.get('due_date'), "dd-MM-yyyy")
        
        # Formatting item rates and amounts
        for item in quotation['items']:
            item['rate'] = frappe.utils.fmt_money(item['rate'], currency=quotation.get('currency'))
            item['amount'] = frappe.utils.fmt_money(item['amount'], currency=quotation.get('currency'))

        for taxe in quotation['taxes']:
            taxe['rate'] = frappe.utils.fmt_money(taxe['rate'], currency=quotation.get('currency'))
            taxe['tax_amount'] = frappe.utils.fmt_money(taxe['tax_amount'], currency=quotation.get('currency'))
            taxe['total'] = frappe.utils.fmt_money(taxe['total'], currency=quotation.get('currency'))
        # Fetch and add supplier address details
        if quotation.get('supplier_address'):
            address = frappe.get_doc('Address', quotation['supplier_address'])
            quotation.update({
                'sup_address_line1': address.address_line1,
                'sup_address_line2': address.address_line2,
                'sup_city': address.city,
                'sup_country': address.country,
                'sup_state': address.state,
                'sup_phone': address.phone,
                'sup_pincode': address.pincode
            })
            
        if quotation.get('shipping_address'):
            address = frappe.get_doc('Address', quotation['shipping_address'])
            quotation.update({
                'ship_address_line1': address.address_line1,
                'ship_address_line2': address.address_line2,
                'ship_city': address.city,
                'ship_country': address.country,
                'ship_state': address.state,
                'ship_phone': address.phone,
                'ship_pincode': address.pincode
            })
    return addtional_docs

@frappe.whitelist(allow_guest=True)
def get_register(registerdata):
    # frappe.log_error(message=f"Initial data type: {type(registerdata)}", title="Data Type Check")

   
    register_data = json.loads(registerdata)
    
    # Log the parsed data type

    # frappe.log_error("Parsed Data Type",type(register_data))

    register = frappe.new_doc("Supplier Registration")
    
    register.first_name = register_data.get('first_name')
    register.last_name = register_data.get('last_name')
    register.phone = register_data.get('phone')
    register.email = register_data.get('email')
    register.state = register_data.get('state')
    register.zip_code = register_data.get('zip_code')
    register.country = register_data.get('country')
    register.address_line1 = register_data.get('address_line1')
    register.address_line2 = register_data.get('address_line2')
    register.city = register_data.get('city')
    # register.website = register_data('website')


    # Log the final register document as a dictionary
    # frappe.log_error(message=f"Register document: {register.as_dict()}", title="Register Document")

    register.insert()
    frappe.db.commit()

@frappe.whitelist(allow_guest=True)
def check_supplier(email):
    frappe.log_error('sdas',[email])
    # user_check=get_userid()

    query = frappe.db.sql(f"""SELECT S.supplier_name
                                FROM `tabSupplier` S
                                INNER JOIN `tabAddress` A ON A.name = S.supplier_primary_address
                                WHERE A.email_id = '{email}'
                                AND A.disabled = 0""",as_dict=True)
    return query
    # email = frappe.get_list('Supplier', filters={'email': email}, fields=['email'])
    # return {"exists": len(email) > 0}
