import Register from "../components/RegisterForm.vue";
import Login from "../components/LogInForm.vue";
import UserProfile from "../components/UserProfile.vue";
import RentCar from "../components/RentCar";
import RentalObjects from "../components/RentalObjects.vue";
import UpdateProfile from "../components/UpdateProfile.vue";
import RentalObjectDetails from "../components/RentalObjectDetails.vue";
import CreateVehicle from "../components/ManagerVue/CreateVehicle.vue";
import VehicleCard from "../components/VehicleCard.vue";
import UpdateVehicle from "../components/ManagerVue/UpdateVehicle.vue";
import CreateObject from "../components/AdministratorVue/CreateObject.vue";
import AddManager from "../components/AdministratorVue/AddManager.vue";
import OneManager from "../components/AdministratorVue/OneManager.vue";
import AvailableRentals from "../components/CustomerVue/AvailableRentals.vue";
import UserOrders from "../components/CustomerVue/UserOrders.vue";
import RentingCar from "../components/CustomerVue/RentACar.vue";
import ManagerRentalObjectDetails from "../components/ManagerRentalObjectDetails.vue";
import ManagerRegistration from "../components/AdministratorVue/ManagerRegistration.vue";
import ProfileForm from "../components/ProfileForm.vue";
import CustomerBasket from "../components/CustomerVue/CustomerBasket.vue";
import ViewUsers from "../components/ViewUsers.vue";
import ViewCustomer from "../components/ViewCustomer.vue";
import ManagerOrders from "../components/ManagerVue/ManagerOrders.vue";
import ViewSuspisios from "../components/ViewSuspisiousCustomers.vue";

export default [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/userProfile", component: UserProfile },
  { path: "/rentCar", component: RentCar },
  { path: "/rentalObjects", component: RentalObjects },
  { path: "/updateProfile", component: UpdateProfile },
  { path: "/singleObject/:id", component: RentalObjectDetails },
  { path: "/vehicles/:id", component: CreateVehicle },
  { path: "/vehicle", component: VehicleCard },
  { path: "/updateVehicle/:idV/:idC", component: UpdateVehicle },
  { path: "/createObject", component: CreateObject },
  { path: "/addManager", component: AddManager },
  { path: "/oneManager", component: OneManager },
  { path: "/availableRentals", component: AvailableRentals },
  { path: "/userOrders", component: UserOrders },
  { path: "/rentingCar", component: RentingCar },
  { path: "/managerRental/:id", component: ManagerRentalObjectDetails },
  { path: "/managerRegistration", component: ManagerRegistration },
  { path: "/userProfile", component: ProfileForm },
  { path: "/basket", component: CustomerBasket },
  { path: "/viewUsers", component: ViewUsers },
  { path: "/viewCustomers/:id",component: ViewCustomer },
  { path: "/managerOrders/:id", component: ManagerOrders },
  { path: "/suspisiousCustomers", component: ViewSuspisios},
];
