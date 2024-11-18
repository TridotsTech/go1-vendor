import frappe
from frappe.model.document import Document


class SupplierRegistration(Document):
	def validate(self):
		
		if self.status == "Approved":
			if not frappe.db.exists("Supplier",{"supplier_name":self.first_name + " " + self.last_name}):
				supplier_new_doc = frappe.get_doc({
													"doctype":"Supplier",
													"supplier_name": self.first_name + " " + self.last_name,
													"country":self.country,
													"supplier_group":"All Supplier Groups",
													"supplier_type":"Company",
													
												})
				
				# supplier_new_doc.append("portal_users",{
				# 	"user":self.email
				# })
				supplier_new_doc.insert(ignore_permissions = True)
				supplier_new_doc.save()
				frappe.db.commit()
				self.insert_address(address_type = "Personal", supplier_new_doc = supplier_new_doc)
				self.insert_address(address_type = "Office", supplier_new_doc = supplier_new_doc)
				self.supplier_id = supplier_new_doc.name
			else:
				supplier_id = frappe.db.get_value("Supplier",{"supplier_name":self.first_name + " " + self.last_name}, "name")
				self.supplier_id = supplier_id
			if not frappe.db.exists("User",{"name":self.email}):
				new_user = frappe.get_doc({
											"doctype":"User",
											"email":self.email,
											"first_name":self.first_name,
											"last_name": self.last_name,
											"mobile_no": self.phone,
											"enabled":0,
											"send_welcome_email":1,
											"user_type": "System User",
											"roles":[{
														"doctype": "Has Role",    
														"parent": self.email,
														"parentfield": "roles",
														"parenttype": "User",
														"role": "Supplier"
													}]
										})
				new_user.insert(ignore_permissions = True)
				frappe.db.commit()
				
    
	def insert_address(self, address_type = "Personal", supplier_new_doc = None):
		frappe.log_error("supplier_new_doc", supplier_new_doc)
		personal_address = frappe.get_doc({
											"doctype":"Address",                      
											"address_title":self.first_name + " " + self.last_name,
											"address_type": address_type,
											"address_line1": self.address_line1,
											"address_line2":self.address_line2,
											"city":self.city,
											"email_id":self.email,
											"phone":self.phone,
											"state":self.state,
											"country":self.country,
											"pincode":self.zip_code,
											"links": [{
												"link_doctype": "Supplier",
												"link_name":supplier_new_doc.name,
												"link_title": supplier_new_doc.supplier_name
											}]
										})
		personal_address.insert(ignore_permissions = True)
		frappe.log_error("personal_address", personal_address.as_dict())
		frappe.db.commit()
		if address_type == "Personal":
			frappe.db.set_value("Supplier",supplier_new_doc.name,"supplier_primary_address",personal_address.name)