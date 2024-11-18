import frappe

@frappe.whitelist()
def make_supplier_invoice(source_name,target_doc = None , ignore_permissions =False):
    from frappe.model.mapper import get_mapped_doc
    target_doc = get_mapped_doc("Purchase Order",source_name,
        {
            "Purchase Order Item": {
                "doctype": "Purchase Invoice Item",
            },
            ""
            "Purchase Order": {
                "doctype": "Supplier Invoice",
                "field_map": {
                    'rounded_total':'rounded_total'
                },
            },
        },
        target_doc,
        ignore_permissions=ignore_permissions,
    )
    return target_doc

@frappe.whitelist()
def get_navbar_routes():
    check=frappe.get_single('Go1 Navbar Settings')
    user_details = frappe.get_all("Sidebar Settings", filters={'parent': 'Go1 Navbar Settings','enabled':1}, fields=['*'],order_by="idx")
    return user_details

@frappe.whitelist()
def get_navbar_logo():
    check=frappe.get_single('Go1 Navbar Settings')
    navbar=f"{frappe.utils.get_url()}{check.application_logo}"
    return {"app_logo":navbar,"datas":check}

@frappe.whitelist()
def get_request():
    quotation=frappe.get_meta('Request for Quotation')
    return quotation

@frappe.whitelist()
def get_address():
    address=frappe.get_meta('Address')
    return address

@frappe.whitelist()
def get_purchase():
    meta=frappe.get_meta('Purchase Order')
    return meta

@frappe.whitelist()
def get_supplier():
    supplier=frappe.get_meta('Supplier Quotation')
    return supplier

@frappe.whitelist()
def get_invoice():
    invoice=frappe.get_meta('Supplier Invoice')
    return invoice


@frappe.whitelist()
def get_issues():
    issue = frappe.get_meta("Issue")
    return issue

# @frappe.whitelist()
# def get_register():
#      register= frappe.get_meta("Supplier Registration")
#      return register

@frappe.whitelist()
def get_username():
   current_user=frappe.session.user
   user_detail = frappe.get_all("User", filters={'name': current_user}, fields=['full_name'])
   return user_detail[0].full_name


#New Dashboard Charts

from frappe.utils import flt
from collections import defaultdict
from frappe import _

# @frappe.whitelist()
# def supplier_login():
#     user=frappe.session.user
#     result=frappe.db.get_all('Portal User',fields=['parent'],filters={"user":user})
#     return result[0].parent if result else ''
@frappe.whitelist()
def supplier_login():
    user = frappe.session.user

    # Fetch the user's email ID from the Address doctype
    query = frappe.db.sql("""
        SELECT A.email_id
        FROM `tabAddress` A
        WHERE A.email_id = %s AND A.disabled = 0
    """, (user,))

    if query:
        # If email exists in the Address doctype, check for associated supplier
        email_id = query[0][0]  # Extract the email_id from the query result

        # Now fetch the supplier name based on the email
        supplier_query = frappe.db.sql("""
            SELECT S.supplier_name
            FROM `tabSupplier` S
            INNER JOIN `tabAddress` A ON A.name = S.supplier_primary_address
            WHERE A.email_id = %s AND A.disabled = 0
        """, (email_id,))

        if supplier_query:
            # Return the supplier name (assuming it is unique)
            return supplier_query[0][0]

    # If no supplier is found, return an empty string or handle accordingly
    return ''


#Number Card 1
@frappe.whitelist()
def get_purchase_order_grand_total():
    supplier=supplier_login()
    if supplier:
        query = frappe.db.sql("""
            SELECT COALESCE(AVG(grand_total), 0) AS total_grand_total
            FROM `tabPurchase Order`
            WHERE docstatus = 1
            AND MONTH(transaction_date) = MONTH(CURRENT_DATE())
            AND YEAR(transaction_date) = YEAR(CURRENT_DATE()) 
            AND supplier= %s
        """,(supplier),as_dict=True)
        total = query[0].get('total_grand_total', 0) if query else 0
        return {"total_grand_total": total}
    else:
        query = frappe.db.sql("""
            SELECT COALESCE(AVG(grand_total), 0) AS total_grand_total
            FROM `tabPurchase Order`
            WHERE docstatus = 1
            AND MONTH(transaction_date) = MONTH(CURRENT_DATE())
            AND YEAR(transaction_date) = YEAR(CURRENT_DATE()) 
           
        """,as_dict=True)
        total = query[0].get('total_grand_total', 0) if query else 0
        return {"total_grand_total": total}
    
    
    
#Number Card2
@frappe.whitelist()
def get_pending_quotation_count():
    supplier = supplier_login()
    if supplier:
        query = frappe.db.sql("""
                SELECT COUNT(Q.name) AS total_count
                FROM `tabRequest for Quotation` Q
                INNER JOIN `tabRequest for Quotation Supplier` QS ON Q.name = QS.parent
                WHERE Q.custom_actioned = 0  
                AND QS.supplier = %s
                """,(supplier),as_dict=True)
        count = query[0].get('total_count', 0) if query else 0
        return {"total_count": count}

    else:
        query =frappe.db.sql( """
                SELECT COUNT(*) AS total_count
                FROM `tabRequest for Quotation`
                WHERE custom_actioned = 0
                """,as_dict=True)
        count = query[0].get('total_count', 0) if query else 0
        return {"total_count": count}

#Number Card3
@frappe.whitelist()
def get_pending_invoice():
        supplier = supplier_login()
        if supplier:
            query = frappe.db.sql("""
                    SELECT COUNT(*) AS total_count
                    FROM `tabPurchase Invoice`
                    WHERE docstatus = 1  
                    AND status = 'Unpaid'
                    AND supplier = %s
                    """,(supplier),as_dict=True)
            count = query[0].get('total_count', 0) if query else 0
            return {"total_count": count}

        else:
            query = frappe.db.sql("""
                    SELECT COUNT(*) AS total_count
                    FROM `tabPurchase Invoice`
                    WHERE docstatus = 1  
                    AND status = 'Unpaid'
                    """,as_dict=True)
            count = query[0].get('total_count', 0) if query else 0
            return {"total_count": count}

#Number Card4
@frappe.whitelist()
def get_pending_inwards():
    supplier=supplier_login()
    if supplier:
        query = frappe.db.sql("""
            SELECT COUNT(*) AS total_count
            FROM `tabPurchase Order`
            WHERE docstatus = 1  
            AND status IN ('To Receive And Bill', 'To Receive')
            AND supplier =%s
        """,(supplier),as_dict=True)
        count = query[0].get('total_count', 0) if query else 0
        return {"total_count": count}
    else:
        query =frappe.db.sql( """
            SELECT COUNT(*) AS total_count
            FROM `tabPurchase Order`
            WHERE docstatus = 1  
            AND status IN ('To Receive And Bill', 'To Receive')
        """,as_dict=True)
        count = query[0].get('total_count', 0) if query else 0
        return {"total_count": count}
    
#Doughnut Chart1
@frappe.whitelist()
def get_purchase_order_status_analysis():
    supplier= supplier_login()
    if supplier:
        query = frappe.db.sql("""
            SELECT 
                status,
                COUNT(*) AS status_count
            FROM `tabPurchase Order`
            WHERE docstatus < 2 
            AND supplier=%s
            GROUP BY status
        """,(supplier),as_dict=True)
    

        status_data = {
        "Billed Amount": 0,
        "Amount to Bill": 0
         }
        for row in query:
            if row['status'] == 'Completed':
                        status_data["Billed Amount"] += row['status_count']
            elif row['status'] in ['To Receive and Bill', 'To Bill']:
                        status_data["Amount to Bill"] += row['status_count']

        return {"status_data": status_data}
    else:
        query = frappe.db.sql("""
            SELECT 
                status,
                COUNT(*) AS status_count
            FROM `tabPurchase Order`
            WHERE docstatus < 2 
            GROUP BY status
        """,as_dict=True)
        status_data = {
        "Billed Amount": 0,
        "Amount to Bill": 0
         }
        for row in query:
            if row['status'] == 'Completed':
                        status_data["Billed Amount"] += row['status_count']
            elif row['status'] in ['To Receive and Bill', 'To Bill']:
                        status_data["Amount to Bill"] += row['status_count']

        return {"status_data": status_data}


#Doughnut Chart2
@frappe.whitelist()
def get_quotation_status_counts():
    supplier = supplier_login()
    if supplier:
        completed_query = frappe.db.sql("""
            SELECT COUNT(Q.name) AS total_count
            FROM `tabRequest for Quotation` Q
            INNER JOIN `tabRequest for Quotation Supplier` QS ON Q.name = QS.parent
            WHERE Q.custom_actioned = 1
            AND QS.supplier=%s
        """,(supplier),as_dict=True)
        pending_query =frappe.db.sql( """
            SELECT COUNT(Q.name) AS total_count
            FROM `tabRequest for Quotation` Q 
            INNER JOIN `tabRequest for Quotation Supplier` QS ON Q.name = QS.parent
            WHERE custom_actioned = 0
            AND QS.supplier=%s

        """,(supplier),as_dict=True)

    

        completed_count = completed_query[0].get('total_count', 0) if completed_query else 0
        pending_count = pending_query[0].get('total_count', 0) if pending_query else 0

        return {
        "status_data": {
            "Completed": completed_count,
            "Pending": pending_count,
        }
    }
    else:
        completed_query = frappe.db.sql("""
            SELECT COUNT(*) AS total_count
            FROM `tabRequest for Quotation` 
            WHERE custom_actioned = 1
        """,as_dict=True)
        pending_query =frappe.db.sql( """
            SELECT COUNT(*) AS total_count
            FROM `tabRequest for Quotation` 
            WHERE custom_actioned = 0
        """,as_dict=True)

    

        completed_count = completed_query[0].get('total_count', 0) if completed_query else 0
        pending_count = pending_query[0].get('total_count', 0) if pending_query else 0

        return {
        "status_data": {
            "Completed": completed_count,
            "Pending": pending_count,
        }
    }

#Bar Chart
@frappe.whitelist()
def get_top_sold_items():
    supplier = supplier_login()
    if supplier:
        query =frappe.db.sql( """
            SELECT poi.item_code, poi.item_name, COUNT(*) as item_count
            FROM `tabPurchase Order Item` poi
            WHERE parent IN (
                SELECT name
                FROM `tabPurchase Order`
                WHERE docstatus = 1  
                AND supplier =%s
            )
            GROUP BY poi.item_code, poi.item_name
            ORDER BY item_count DESC
            LIMIT 5
        """,(supplier),as_dict=True)
        return {'message': {'items': query}}
    else:
         query =frappe.db.sql( """
            SELECT poi.item_code, poi.item_name, COUNT(*) as item_count
            FROM `tabPurchase Order Item` poi
            WHERE parent IN (
                SELECT name
                FROM `tabPurchase Order`
                WHERE docstatus = 1  
            )
            GROUP BY poi.item_code, poi.item_name
            ORDER BY item_count DESC
            LIMIT 5
        """,as_dict=True)
         return {'message': {'items': query}}
         
#Line Chart
@frappe.whitelist()
def get_monthly_grand_total():
    supplier = supplier_login()
    if supplier:
        grand_total_data = frappe.db.sql(r"""
            SELECT
                DATE_FORMAT(transaction_date, '%%b') as month,
                SUM(grand_total) as monthly_total
            FROM `tabPurchase Order`
            WHERE docstatus = 1
            AND supplier = %s
            GROUP BY DATE_FORMAT(transaction_date, '%%Y-%%m')
            ORDER BY FIELD(DATE_FORMAT(transaction_date, '%%b'), 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar')
        """, (supplier), as_dict=True)

        financial_year_order = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
        monthly_totals = {month: 0 for month in financial_year_order}

        for record in grand_total_data:
            month = record.get('month')
            total = flt(record.get('monthly_total'))
            if month in monthly_totals:
                monthly_totals[month] += total

        return {
            "labels": list(monthly_totals.keys()),
            "data": list(monthly_totals.values())
        }
    else:
        grand_total_data = frappe.db.sql(f"""
            SELECT
                DATE_FORMAT(transaction_date, '%b') as month,
                SUM(grand_total) as monthly_total
            FROM `tabPurchase Order`
            WHERE docstatus = 1
            GROUP BY DATE_FORMAT(transaction_date, '%Y-%m')
            ORDER BY FIELD(DATE_FORMAT(transaction_date, '%b'), 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar')
        """, as_dict=True)

        financial_year_order = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
        monthly_totals = {month: 0 for month in financial_year_order}

        for record in grand_total_data:
            month = record.get('month')
            total = flt(record.get('monthly_total'))
            if month in monthly_totals:
                monthly_totals[month] += total

        return {
            "labels": list(monthly_totals.keys()),
            "data": list(monthly_totals.values())
        }
        
