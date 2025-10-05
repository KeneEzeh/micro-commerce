import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, Button, View } from "react-native";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import LoginScreen from "./src/screens/Login";
import RegisterScreen from "./src/screens/Register";
import HomeScreen from "./src/screens/Home";
import CartScreen from "./src/screens/CartScreen";
import ProductDetails from "./src/screens/ProductDetails";
import ProductList from "./src/screens/ProductList";
import OrdersScreen from "./src/screens/Order";
import AdminHome from "./src/screens/Admin/AdminHome";
import ManageProducts from "./src/screens/Admin/ManageProducts";
import ManageOrders from "./src/screens/Admin/ManageOrders";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AppStack() {
  const { logout } = useAuth();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => <Button title="Logout" onPress={logout} />,
        }}
      />
      <Stack.Screen name="Products" component={ProductList} />
      <Stack.Screen name="Details" component={ProductDetails} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} />
    </Stack.Navigator>
  );
}

function AdminStack() {
  const { logout } = useAuth();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminHome"
        component={AdminHome}
        options={{
          title: "Admin - Manage Products",
          headerRight: () => <Button title="Logout" onPress={logout} />,
        }}
      />
      <Stack.Screen
        name="ManageProducts"
        component={ManageProducts}
        options={{ title: "Manage Products" }}
      />
      <Stack.Screen
        name="ManageOrders"
        component={ManageOrders}
        options={{ title: "Manage Orders" }}
      />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  const { userToken, isAdmin, loading } = useAuth();

  console.log("isAdmin...", isAdmin);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return !userToken ? <AuthStack /> : isAdmin ? <AdminStack /> : <AppStack />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
