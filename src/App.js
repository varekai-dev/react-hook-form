import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header } from './components/Header';
import Step1 from './components/Step1';
import Step2 from './components/Step2';

const Step3 = () => <>Step 3</>;
const Result = () => <>Result</>;

function App() {
	return (
		<>
			<Header />
			<Router>
				<Switch>
					<Route exact path="/" component={Step1} />
					<Route exact path="/step2" component={Step2} />
					<Route exact path="/step3" component={Step3} />
					<Route exact path="/result" component={Result} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
