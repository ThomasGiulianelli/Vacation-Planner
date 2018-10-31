import * as React from 'react';

import VacationForm from './VacationForm';

interface State {
    resultComputed: boolean;
}

interface ViewProps {
    resultComputed: boolean;
    onViewChange: Function;
}

class InteractiveWindow extends React.Component<any,State> {
    constructor(props: any) {
        super(props);
        this.handleViewChange = this.handleViewChange.bind(this);
        this.state = {
            resultComputed: false
        };
    }

    handleViewChange(event: any) {
        this.setState({resultComputed:true});
    }

    render() {
        const resultComputed = this.state.resultComputed;

        return (
            <div><View resultComputed={resultComputed} onViewChange={this.handleViewChange} /></div>
        );
    }
}

export default InteractiveWindow;

function Instructions() {
    return <p>Please fill out the following informaton about your trip.</p>;
}

function View(props: ViewProps) {
    const resultComputed = props.resultComputed;
    
    if (!resultComputed) {
        return (<div>
        <Instructions />
            <div>
                <VacationForm onViewChange={props.onViewChange}/>
            </div>
        </div>);
    } else {
        return <div><p>Results and reccomendations go here.</p></div>;
    }
}
