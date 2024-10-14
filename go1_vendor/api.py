import frappe
from frappe import _
import json

# Request for quotation
@frappe.whitelist()
def get_quotation():
    my_data=get_test()
    
    
    filters={}
    if my_data:
        filters={'supplier': my_data}
    quotations = frappe.db.get_all("Request for Quotation", fields=['*'], filters=filters)
    supplier_item =frappe.db.get_all("Request for Quotation Supplier", fields=['*'])
    quotation_items =frappe.db.get_all("Request for Quotation Item", fields=['*'])
   
    quotation_docs = []

    for quotation in quotations:
        items = []
        suppliers=[]
        for item in quotation_items:
            if item["parent"] == quotation["name"]:
                items.append(item)
        quotation["items"] = items
        for supplier in supplier_item:
            if supplier["parent"]==quotation["name"]:
                suppliers.append(supplier)
        quotation["suppliers"] = supplier

        quotation_docs.append(quotation)

    return quotation_docs
# Purchase order
@frappe.whitelist()
def get_purchaseorder():
    # Getting supplier data
    my_data = get_test()
    
    # Setting up filters for the query
    filters = {}
    if my_data:
        filters = {'supplier': my_data}
    
    # Fetching purchase orders and related items
    purchase_orders = frappe.db.get_all("Purchase Order", fields=['*'], filters=filters)
    purchase_order_items = frappe.db.get_all("Purchase Order Item", fields=['*'])
    taxes_and_charges = frappe.db.get_all("Purchase Taxes and Charges", fields=['*'])
    
    purchase_order_docs = []

    # Loop through purchase orders and append items and taxes
    for order in purchase_orders:
        items = []
        taxes = []
        
        # Link the items to the respective purchase orders
        for item in purchase_order_items:
            if item["parent"] == order["name"]:
                items.append(item)
        order["items"] = items  # Add items to the purchase order

        # Link the taxes and charges to the respective purchase orders
        for tax in taxes_and_charges:
            if tax["parent"] == order["name"]:
                taxes.append(tax)
        order["taxes"] = taxes  # Add taxes to the purchase order

        purchase_order_docs.append(order)

    # Formatting data for each purchase order
    for order in purchase_order_docs:
        order['grand_total'] = frappe.utils.fmt_money(order.get('grand_total'), currency=order.get('currency'))
        order['total'] = frappe.utils.fmt_money(order.get('total'), currency=order.get('currency'))
        order['rounded_total'] = frappe.utils.fmt_money(order.get('rounded_total'), currency=order.get('currency'))
        order['total_taxes_and_charges'] = frappe.utils.fmt_money(order.get('total_taxes_and_charges'), currency=order.get('currency'))
        
        # Formatting dates
        order['posting_date'] = frappe.utils.formatdate(order.get('posting_date'), "dd-MM-yyyy")
        
        # Format the 'delivery_date' if present
        if order.get('delivery_date'):
            order['delivery_date'] = frappe.utils.formatdate(order.get('delivery_date'), "dd-MM-yyyy")
        
        # Formatting item rates and amounts
        for item in order['items']:
            item['rate'] = frappe.utils.fmt_money(item['rate'], currency=order.get('currency'))
            item['amount'] = frappe.utils.fmt_money(item['amount'], currency=order.get('currency'))
    
        # Fetch and add supplier address details
        if order.get('supplier_address'):
            address = frappe.get_doc('Address', order['supplier_address'])
            order.update({
                'sup_address_line1': address.address_line1,
                'sup_address_line2': address.address_line2,
                'sup_city': address.city,
                'sup_country': address.country,
                'sup_state': address.state,
                'sup_phone': address.phone,
                'sup_pincode': address.pincode
            })
            
        # Fetch and add shipping address details
        if order.get('shipping_address'):
            address = frappe.get_doc('Address', order['shipping_address'])
            order.update({
                'ship_address_line1': address.address_line1,
                'ship_address_line2': address.address_line2,
                'ship_city': address.city,
                'ship_country': address.country,
                'ship_state': address.state,
                'ship_phone': address.phone,
                'ship_pincode': address.pincode
            })

    return purchase_order_docs


# supplier quotation
@frappe.whitelist()
def get_supplierquotation():
    # Getting supplier data
    my_data = get_test()
    
    # Setting up filters for the query
    filters = {}
    if my_data:
        filters = {'supplier': my_data}
    
    # Fetching supplier quotations and related items
    quotations = frappe.db.get_all("Supplier Quotation", fields=['*'], filters=filters)
    supplier_items = frappe.db.get_all("Supplier Quotation Item", fields=['*'])
    taxes_and_charges = frappe.db.get_all("Purchase Taxes and Charges", fields=['*'])

    quotation_docs = []

    # Loop through quotations and append supplier items
    for quotation in quotations:
        items = []
        taxes = []
        
        # Link the items to the respective quotations
        for item in supplier_items:
            if item["parent"] == quotation["name"]:
                items.append(item)
        quotation["items"] = items  # Add items to the quotation

        # Link the taxes and charges to the respective quotations
        for tax in taxes_and_charges:
            if tax["parent"] == quotation["name"]:
                taxes.append(tax)
        quotation["taxes"] = taxes  # Add taxes to the quotation

        quotation_docs.append(quotation)

    # Formatting data for each quotation
    for quotation in quotation_docs:
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

    return quotation_docs


# Purchase invoice
@frappe.whitelist()
def get_purchaseinvoice():
    # Get supplier data
    my_data = get_test()
    
    # Setting filters based on supplier data
    filters = {}
    if my_data:
        filters = {'supplier': my_data}
    
    # Fetching purchase invoices and related items
    invoices = frappe.db.get_all("Purchase Invoice", fields=['*'], filters=filters)
    invoice_items = frappe.db.get_all("Purchase Invoice Item", fields=['*'])
    taxes_and_charges = frappe.db.get_all("Purchase Taxes and Charges", fields=['*'])

    invoice_docs = []

    # Loop through invoices and associate invoice items and taxes
    for invoice in invoices:
        items = []
        taxes = []
        
        # Link the items to the respective invoices
        for item in invoice_items:
            if item["parent"] == invoice["name"]:
                items.append(item)
        invoice["items"] = items  # Add items to the invoice

        # Link the taxes and charges to the respective invoices
        for tax in taxes_and_charges:
            if tax["parent"] == invoice["name"]:
                taxes.append(tax)
        invoice["taxes"] = taxes  # Add taxes to the invoice

        invoice_docs.append(invoice)

    # Formatting data for each invoice
    for invoice in invoice_docs:
        invoice['grand_total'] = frappe.utils.fmt_money(invoice.get('grand_total'), currency=invoice.get('currency'))
        invoice['total'] = frappe.utils.fmt_money(invoice.get('total'), currency=invoice.get('currency'))
        invoice['rounded_total'] = frappe.utils.fmt_money(invoice.get('rounded_total'), currency=invoice.get('currency'))
        invoice['total_taxes_and_charges'] = frappe.utils.fmt_money(invoice.get('total_taxes_and_charges'), currency=invoice.get('currency'))
        
        # Formatting dates (check if dates exist)
        if invoice.get('posting_date'):
            invoice['posting_date'] = frappe.utils.formatdate(invoice.get('posting_date'), "dd-MM-yyyy")
        if invoice.get('due_date'):
            invoice['due_date'] = frappe.utils.formatdate(invoice.get('due_date'), "dd-MM-yyyy")
        
        # Formatting item rates and amounts
        for item in invoice['items']:
            item['rate'] = frappe.utils.fmt_money(item['rate'], currency=invoice.get('currency'))
            item['amount'] = frappe.utils.fmt_money(item['amount'], currency=invoice.get('currency'))

        # Fetch and add supplier address details
        if invoice.get('supplier_address'):
            address = frappe.get_doc('Address', invoice['supplier_address'])
            invoice.update({
                'sup_address_line1': address.address_line1,
                'sup_address_line2': address.address_line2,
                'sup_city': address.city,
                'sup_country': address.country,
                'sup_state': address.state,
                'sup_phone': address.phone,
                'sup_pincode': address.pincode
            })
            
        # Fetch and add shipping address details
        if invoice.get('shipping_address'):
            address = frappe.get_doc('Address', invoice['shipping_address'])
            invoice.update({
                'ship_address_line1': address.address_line1,
                'ship_address_line2': address.address_line2,
                'ship_city': address.city,
                'ship_country': address.country,
                'ship_state': address.state,
                'ship_phone': address.phone,
                'ship_pincode': address.pincode
            })

    return invoice_docs


@frappe.whitelist()
def get_userid():
    return frappe.session.user


# @frappe.whitelist()
# def getcustomer():
#     user_check = get_userid()
#     suppliers = frappe.db.get_all("Supplier", fields=['name'])
#     supplier_portal_details = []
#     suppliers_details = []
#     filters={}
#     for supplier in suppliers:
#         if user_check=="administrator":
#             filters={}
#         else:
#             filters={'parent': supplier['name']}
#         portal_users = frappe.db.get_all("Portal User", filters=filters, fields=['user'])
#         for portal_user in portal_users:
#             if portal_user['user'] == user_check:
#                 supplier_portal_details.append({
#                     'supplier': supplier,
#                     'portal_users': portal_users
#                 })

#     for detail in supplier_portal_details:
#         suppliers_details.append(detail['supplier']['name'])

#     return suppliers_details

@frappe.whitelist()
def get_test():
    user_check=get_userid()
    if user_check!="administrator":
        filters={'user': user_check}
        supplier = frappe.db.get_all("Portal User", filters=filters, fields=['parent'])
    
    return supplier[0].parent if supplier else ''


@frappe.whitelist()
def get_address():
    
    my_data = get_test() 
    
    address_list = []   
    addresses = frappe.db.get_all("Address", fields=['*'])
 
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
def get_test():
    user_check=get_userid()
    if user_check!="administrator":
        filters={'user': user_check}
        supplier = frappe.db.get_all("Portal User", filters=filters, fields=['parent'])
    
    return supplier[0].parent if supplier else ''


@frappe.whitelist()
def get_address():
    
    my_data = get_test() 
    
    address_list = []   
    addresses = frappe.db.get_all("Address", fields=['*'])
 
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

