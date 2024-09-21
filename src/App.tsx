import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
//###############################################################################
//Notes
import Create_Notes from "./Notes/Create_Notes"
import Show_All_Notes from "./Notes/Show_All_Notes"
import Edit_Notes from "./Notes/Edit_Notes"

//###############################################################################
// expenses
import Create_Expenses from "./Expenses/Create_Expenses"
import Show_All_Expenses from "./Expenses/Show_All_Expenses"
import Edit_Expenses from "./Expenses/Edit_Expenses"
//###############################################################################
//Transaction
import Create_Transactions from "./Transactions/Create_Transactions"
import Show_All_Transactions from "./Transactions/Show_All_Transactions"
import Edit_Transactions from "./Transactions/Edit_Transactions"
//###############################################################################
// stock historical data
import All_Historical_Data from './Stocks/Historical_Data/All_Historical_Data';
import Last_Month_Historical_data from './Stocks/Historical_Data/Last_Month_Historical_Data';
import Last_Week_Historical_data from './Stocks/Historical_Data/Last_Week_Historical_Data';
import Last_Day_Historical_data from './Stocks/Historical_Data/Last_Day_Historical_Data';
import All_Stocks_Names from './Stocks/Historical_Data/All_Stocks_Names';
//###############################################################################
//Buy Stocks
import Buy_Stock from './Stocks/Buy_Stock/Buy_Stock';
//###############################################################################
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
        {/* Notes */}
        <Route
          path="/notes/create_notes"
          element={
            <>
              <PageTitle title="Create Notes Danisherror app" />
              <Create_Notes />
            </>
          }
        />
        <Route
          path="/notes/show_all_notes"
          element={
            <>
              <PageTitle title="Show All Notes Danisherror app" />
              <Show_All_Notes />
            </>
          }
        />
        <Route
          path= "/notes/edit_note/:note_id"
          element={
            <>
              <PageTitle title="Edit Notes Danisherror app" />
              <Edit_Notes />
            </>
          }
        />
        {/* Notes end*/}

        {/* Expense start*/}
        <Route
          path="/expenses/create_expenses"
          element={
            <>
              <PageTitle title="Create expenses Danisherror app" />
              <Create_Expenses />
            </>
          }
        />
         <Route
          path="/expenses/show_all_expenses"
          element={
            <>
              <PageTitle title="Show All Expenses Danisherror app" />
              <Show_All_Expenses />
            </>
          }
        />
        <Route
          path= "/expenses/edit_expense/:expense_id"
          element={
            <>
              <PageTitle title="Edit Expensses Danisherror app" />
              <Edit_Expenses />
            </>
          }
        />

        {/* Expense end*/}
        {/* Transaction start*/}
        <Route
          path="/transactions/create_transactions"
          element={
            <>
              <PageTitle title="Create transactions Danisherror app" />
              <Create_Transactions />
            </>
          }
        />
        <Route
          path="/transactions/show_all_transactions"
          element={
            <>
              <PageTitle title="Show All Transactions Danisherror app" />
              <Show_All_Transactions />
            </>
          }
        />
        <Route
          path= "/transactions/edit_transaction/:transaction_id"
          element={
            <>
              <PageTitle title="Edit Transaction Danisherror app" />
              <Edit_Transactions />
            </>
          }
        />

        {/* Transaction end*/}
        {/*stock data of a particular stock start*/}
        <Route
          path= "/stocks/historical_data/all_historical_data/:symbol_id"
          element={
            <>
              <PageTitle title="All historical data fo symbol Danisherror app" />
              <All_Historical_Data />
            </>
          }
        />
        <Route
          path= "/stocks/historical_data/last_month_historical_data/:symbol_id"
          element={
            <>
              <PageTitle title="Last Month historical data fo symbol Danisherror app" />
              <Last_Month_Historical_data />
            </>
          }
        />
        <Route
          path= "/stocks/historical_data/last_week_historical_data/:symbol_id"
          element={
            <>
              <PageTitle title="Last week historical data fo symbol Danisherror app" />
              <Last_Week_Historical_data />
            </>
          }
        />
        <Route
          path= "/stocks/historical_data/last_day_historical_data/:symbol_id"
          element={
            <>
              <PageTitle title="Last Day historical data fo symbol Danisherror app" />
              <Last_Day_Historical_data />
            </>
          }
        />
        <Route
          path= "/stocks/historical_data/all_stocks_names"
          element={
            <>
              <PageTitle title="Stock Names data fo symbol Danisherror app" />
              <All_Stocks_Names />
            </>
          }
        />
        {/*stock data of a particular stock start*/}
        {/*Buy Stocks start*/}
        <Route
          path= "/stocks/buy_stock/:symbol_id"
          element={
            <>
              <PageTitle title="Buy stock Danisherror app" />
              <Buy_Stock />
            </>
          }
        />
        {/*Buy Stocks ends*/}
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
