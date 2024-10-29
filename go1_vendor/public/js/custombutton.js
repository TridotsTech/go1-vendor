frappe.ui.form.on("Purchase Order", {
	refresh(frm) {
          frm.add_custom_button("Invoice",()=>{
            frappe.model.open_mapped_doc({
                method: 'go1_vendor.api.make_supplier_invoice',
                frm:frm,
                callback: function(response) {
                    // frappe.set_route()
                    frappe.new_doc("Supplier Invoice")
                    console.log(response.message)
                }
            });
          },"Create")
	},
});
