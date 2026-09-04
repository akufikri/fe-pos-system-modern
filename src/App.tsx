import "./App.css";
// import ProductList from "./Components/ProductList";
// import LoginPage from "./pages/LoginPage";
// import { ProductCard } from "./Components/ProductCard";
// import { DashboardCashier } from "./pages/DashboardCashier";
// import { MainApp } from "./Components/CardContainer";
// import { CounterComponent } from "./Components/CounterComponent";
import { Button } from "./Components/ui/button";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Components/ui/card";

function App() {
  return (
    <>
      <div>
        {/* <ProductCard /> */}
        {/* <DashboardCashier /> */}
        {/* <MainApp /> */}
        {/* <CounterComponent /> */}
        {/* <LoginPage /> */}
        {/* <ProductList /> */}
        <Button>Login Cuyyyy</Button>

        <div className="p-5">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
              <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;
