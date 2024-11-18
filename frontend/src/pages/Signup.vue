
   <template>
    <div>
      <div class="border p-4 mb-2 bg-blue-500 font-bold">
        <h1>Go1 Vendor</h1>
      </div>
      <h3 class="sign p-2 font-bold">Become a seller</h3>
      <div class="tab border w-max p-2">
        <Tabs
          v-slot="{ tab }"
          v-model="state.index"
          :tabs="state.tabs_without_icon"
        >
          <div class="p-5">
            <!-- Render Personal Details if index is 0 -->
            <div v-if="state.index === 0">
              <div
                class="signup grid grid-cols-1 md:grid-cols-2 gap-5 p-6 overflow-auto w-max mt-10"
              >
                <div class="w-96">
                  <!-- <div class="mx-24"> -->
                  <!-- <ErrorMessage :message="'*'"/> -->
                <!-- </div> -->
                  <FormControl
                    type="text"
                    size="md"
                    variant="subtle"
                    label="First Name *" 
                    v-model="first_name"
                    placeholder="Enter the First Name"
                    class="mb-5 p-2 reqd"
                  >
                  </FormControl>
                  <FormControl
                    type="phone"
                    label="Mobile Number *"
                    v-model="phone1"
                    class="mb-5 p-2"
                    placeholder="Enter the Mobile Number"
                  />
                  <!-- <ErrorMessage :message="'Please Enter valid Phone Number (example +91-9165253468)'" /> -->
                   <p></p>
                  <FormControl
                    type="email"
                    size="md"
                    variant="subtle"
                    label="Email *"
                    v-model="email"
                    placeholder="Enter the E-mail"
                    class="mb-5 p-2"
                  />
                  <FormControl
                    type="text"
                    size="md"
                    variant="subtle"
                    label="Last Name *"
                    placeholder="Enter the Last Name"
                    v-model="last_name"
                    class="mb-5 p-2"
                  />
                  <FormControl
                    type="text"
                    size="md"
                    variant="subtle"
                    label="Alternate Mobile Number"
                    placeholder="Enter the Alternate Mobile Number"
                    v-model="alternate_mobile_number"
                    class="mb-5 p-2"
                  />
                  <FormControl
                    type="text"
                    size="md"
                    variant="subtle"
                    label="Address *"
                    placeholder="Enter the Address"
                    v-model="address"
                    class="mb-5 p-2"
                  />
                </div>
                <div>
                  <FormControl
                    type="select"
                    size="md"
                    variant="subtle"
                    :options="customOption"
                    label="Country"
                    placeholder="Enter the country"
                    v-model="country"
                    class="mb-5 p-2"
                  />
                  <FormControl
                    type="text"
                    size="md"
                    variant="subtle"
                    label="Zipcode *"
                    placeholder="Enter the Zipcode"
                    v-model="zipcode"
                    class="mb-5 p-2"
                  />
                  <FormControl
                    type="text"
                    size="md"
                    variant="subtle"
                    label="Longitude *"
                    placeholder="Enter the Longitude"
                    v-model="longitude"
                    class="mb-5 p-2"
                  />
                  <FormControl
                    type="text"
                    size="md"
                    variant="subtle"
                    label="Latitude *"
                    placeholder="Enter the latitude"
                    v-model="latitude"
                    class="mb-5 p-2"
                  />
                  <FormControl
                    type="text"
                    size="md"
                    variant="subtle"
                    label="State"
                    placeholder="Enter the State"
                    v-model="states"
                    class="mb-5 p-2"
                  />
                  <FormControl
                    type="text"
                    size="md"
                    variant="subtle"
                    label="City"
                    placeholder="Enter the City"
                    v-model="city"
                    class="mb-5 p-2"
                  />
                  <Button
                    variant="solid"
                    theme="blue"
                    size="md"
                    label="Next"
                    class="text-primary"
                    @click="nextpage"
                  />
                  <Dialog v-model="dialog2">
                    <template #body-title>
                      <h3>Mandatory Error</h3>
                    </template>
                    <template #body-content>
                      <p>Please fill all mandatory fields in Personal Details.</p>
                    </template>
                    <template #actions>
                      <Button class="ml-2" @click="closeDialog">Close</Button>
                    </template>
                  </Dialog>
                  <!-- next button dialog box open -->
                </div>
              </div>
            </div>
            <div
              v-if="state.index === 1"
              class="signup grid grid-cols-1 md:grid-cols-2 gap-5 p-6 overflow-auto w-max mt-10"
            >
              <div class="w-96">
                <FormControl
                  type="text"
                  size="md"
                  variant="subtle"
                  label="Business Name *"
                  placeholder="Enter the Business Name"
                  v-model="business_name"
                  class="mb-5 p-2"
                />
                <FormControl
                  type="text"
                  size="md"
                  variant="subtle"
                  label="Latitude *"
                  placeholder="Enter the Latitude"
                  v-model="latitude2"
                  class="mb-5 p-2"
                />
                <FormControl
                  type="text"
                  size="md"
                  variant="subtle"
                  label="State *"
                  placeholder="Enter the State"
                  v-model="state2"
                  class="mb-5 p-2"
                />
                <FormControl
                  type="text"
                  size="md"
                  variant="subtle"
                  label="Zip Code *"
                  placeholder="Enter the Zip Code"
                  v-model="zipcode2"
                  class="mb-5 p-2"
                />
                <FormControl
                  type="text"
                  size="md"
                  variant="subtle"
                  label="Longitude *"
                  placeholder="Enter the Longitude"
                  v-model="longitude2"
                  class="mb-5 p-2"
                />
                <FormControl
                  type="select"
                  size="md"
                  variant="subtle"
                  label="Use Drivers Of?"
                  placeholder="Select Use Drivers Of?"
                  v-model="drivers"
                  class="mb-5 p-2"
                  :options="[
                    {
                      label: 'Self',
                    },
                    {
                      label: 'Service Provider',
                    },
                  ]"
                />
                <FormControl
                  type="text"
                  size="md"
                  variant="subtle"
                  label="Payment Plan"
                  placeholder="Enter the Payment Plan"
                  v-model="payment"
                  class="mb-5 p-2"
                />
                <FormControl
                  type="text"
                  size="md"
                  variant="subtle"
                  label="GSTIN"
                  placeholder="Enter the GSTIN"
                  v-model="gstin"
                  class="mb-5 p-2"
                />
                <FormControl
                  type="text"
                  size="md"
                  variant="subtle"
                  label="CIN"
                  placeholder="Enter the CIN"
                  v-model="cin"
                  class="mb-5 p-2"
                />
              </div>
              <div>
                <FormControl
                  type="textarea"
                  size="md"
                  variant="subtle"
                  label="Seller Address *"
                  placeholder="Enter Your Seller Address Here"
                  v-model="selleraddress"
                  class="mb-5 p-2"
                />
                <FormControl
                  type="select"
                  size="md"
                  variant="subtle"
                  label="Country *"
                  :options="customOption"
                  placeholder="Select the Country"
                  v-model="country"
                  class="mb-5 p-2"
                />
                <FormControl
                  type="text"
                  size="md"
                  variant="subtle"
                  label="City *"
                  placeholder="Enter the City"
                  v-model="city2"
                  class="mb-5 p-2"
                />
                <FormControl
                  type="text"
                  size="md"
                  variant="subtle"
                  label="Landmark"
                  placeholder="Enter the Landmark"
                  v-model="landmark"
                  class="mb-5 p-2"
                />
                <FormControl
                  type="datetime-local"
                  size="md"
                  variant="subtle"
                  label="Posting Date"
                  v-model="postingdate"
                  class="mb-5 p-2"
                />
                <FormControl
                  type="url"
                  size="md"
                  variant="subtle"
                  label="Menu Url"
                  placeholder="Enter the Menu Url"
                  v-model="menu" 
                  class="mb-5 p-2"
                />
                <FormControl
                  type="select"
                  size="md"
                  variant="subtle"
                  label="Online Merchant ID"
                  placeholder="Select Online Merchant ID"
                  v-model="online"
                  class="mb-5 p-2"
                  :options="[
                    {
                      label: 'Yes',
                    },
                    {
                      label: 'No',
                    },
                  ]"
                />
                <FormControl
                  type="text"
                  size="md"
                  variant="subtle"
                  label="PAN"
                  placeholder="Enter the PAN"
                  v-model="pan"
                  class="mb-5 p-2"
                />
                <FormControl
                  type="select"
                  size="md"
                  variant="subtle"
                  label="Party Type"
                  placeholder="Select Party Type"
                  v-model="party"
                  :options="[
                    {
                      label: 'Shareholder',
                    },
                    {
                      label: 'Employee',
                    },
                    {
                      label: 'Supplier',
                    },
                    {
                      label: 'Customer',
                    },
                  ]"
                  class="mb-5 p-2"
                />
                <Button
                  variant="solid"
                  theme="blue"
                  size="md"
                  label="Save"
                  @click="createIssue"
                />
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  </template>
  <script setup>
  import { useRouter } from 'vue-router'
  import { Button, FormControl, Tabs, createResource, Dialog } from 'frappe-ui'
  import { ref, reactive, onMounted,watch } from 'vue'
  
  const router = useRouter()
  const customOption = ref([])
  const dialog2 = ref(false)
  
  const optionsCountry = async (limit = 1000) => {
    try {
      const response = await fetch(
        `/api/resource/Country?fields=["country_name"]&limit=${limit}`
      )
      if (!response.ok) throw new Error('Network response was not ok')
  
      const prioritydata = await response.json()
      customOption.value =
        prioritydata.data.map((user) => user.country_name) || []
    } catch (error) {
      console.error('Error fetching Country:', error)
    }
  }
  
  const state = reactive({
    index: 0,
    tabs_without_icon: [
      { label: 'Personal Details', content: ' ' },
      { label: 'Business Details' },
    ],
  })
  
  // Personal Details
  const first_name = ref('')
  const last_name = ref('')
  const phone1 = ref('')
  const alternate_mobile_number = ref('')
  const email = ref('')
  const address = ref('')
  const country = ref('')
  const zipcode = ref('')
  const longitude = ref('')
  const latitude2 = ref('')
  const states = ref('')
  const city = ref('')
  
  // Business Details
  const business_name = ref('')
  const latitude = ref('')
  const state2 = ref('')
  const zipcode2 = ref('')
  const longitude2 = ref('')
  const drivers = ref('')
  const payment = ref('')
  const gstin = ref('')
  const cin = ref('')
  const selleraddress = ref('')
  // const country2 = ref('');
  const postingdate = ref('')
  const online = ref('')
  const city2 = ref('')
  const landmark = ref('')
  const menu = ref('')
  const party = ref('')
  const pan = ref('')
  
  let registerdata=ref()
  
  console.log("reg",registerdata)
  
  const RegisterDetails = createResource({
      url:'go1_vendor.apidata.get_register',
      params: {
      'registerdata':JSON.stringify(registerdata)
      }, 
      method: 'GET',
      
    })
    console.log(registerdata)
    const createIssue = async () => {
    registerdata = {
      first_name: first_name.value,
      last_name: last_name.value,
      phone: phone1.value,
      alternate_mobile_number: alternate_mobile_number.value,
      email: email.value,
      states: states.value,
      zipcode: zipcode.value,
      country: country.value,
      longitude: longitude.value,
      latitude: latitude.value,
      address: address.value,
      city: city.value,
      restaurant_name: business_name.value,
      business_latitude: latitude2.value,
      business_state: state2.value,
      business_zip_code: zipcode2.value,
      business_longitude: longitude2.value,
      driver_type: drivers.value,
      payment_plan: payment.value,
      gstin: gstin.value,
      cin: cin.value,
      business_address: selleraddress.value,
      business_country: country.value,
      business_city: city2.value,
      business_landmark: landmark.value,
      posting_date: postingdate.value,
      menu_url: menu.value,
      online_merchant_id: online.value,
      pan: pan.value,
      party_type: party.value,
    }
    
    RegisterDetails.params = { "registerdata": JSON.stringify(registerdata) }
    await RegisterDetails.fetch()
  
    console.log("Data submitted:", registerdata)
  
    router.push('/account/login')
  }
  
  watch(registerdata, (new_registerdata) => {
  
    
  
  RegisterDetails.params={"registerdata": JSON.stringify(registerdata)};
  RegisterDetails.fetch();
  
  
  }, { deep: true });
  
  const validatePersonalDetails = () => {
    if (!first_name.value || !last_name.value || !email.value || !country.value || !zipcode.value) {
      return false
    }
    return true
  }
  
  const nextpage = () => {
    if (!validatePersonalDetails()) {
      dialog2.value = true 
    } else {
      state.index = 1 
    }
  }
  
  const closeDialog = () => {
    dialog2.value = false 
  }
  
  onMounted(async () => {
    await optionsCountry();
    
  })
  </script>
  <style>
  .signup {
    margin-left: 10px;
  }
  .sign {
    margin-left: 200px;
  }
  .tab {
    margin-left: 200px;
  }
  .error {
    color: red;
  }
  </style>
  