import React from 'react';
import './App.css';
import Login from './Pages/Login';
import { Home } from './Pages/Home';
import { NotFound } from './Pages/NotFound';
import { AuthProvider } from './Firebase/Auth';
import { GlobalProvider } from './Context/GlobalState';
import { PrivateRoute } from './PrivateRoute';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

function App() {
	return (
		<GlobalProvider>
			<AuthProvider>
				<BrowserRouter>
					<Switch>
						<PrivateRoute exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
						<Route path="/404" component={NotFound} />
						<Redirect to="/404" />
					</Switch>
				</BrowserRouter>
			</AuthProvider>
		</GlobalProvider>
	);
}

export default App;
