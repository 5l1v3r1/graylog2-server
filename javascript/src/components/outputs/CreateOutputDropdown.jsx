'use strict';

var React = require('react/addons');
var OutputsStore = require('../../stores/outputs/OutputsStore');
var StreamsStore = require('../../stores/streams/StreamsStore');
var ConfigurationForm = require('../configurationforms/ConfigurationForm');
var $ = require('jquery'); // excluded and shimed

var CreateOutputDropdown = React.createClass({
    getInitialState() {
        return {
            types: [],
            typeDefinition: [],
            typeName: "",
            streamId: this.props.streamId
        };
    },
    componentDidMount() {
        this.loadData();
    },
    componentWillReceiveProps(props) {
        setState(props);
    },
    loadData() {
        OutputsStore.loadAvailableTypes((types) => {
            this.setState({types:types});
        });
    },
    render() {
        var outputTypes = $.map(this.state.types, this._formatOutputType);
        return (
            <div>
                <div className="form-group form-inline">
                    <select id="input-type" defaultValue="placeholder" onChange={this.onTypeChange} className="form-control">
                        <option value="placeholder" disabled>--- Select Output Type ---</option>
                        {outputTypes}
                    </select>

                    <button className="btn btn-success btn-sm" onClick={this._openModal}>Launch new output</button>
                </div>

                <ConfigurationForm ref="configurationForm" key="configuration-form-output" configFields={this.state.typeDefinition} title="Create new Output"
                                   helpBlock={<p className="help-block">{"Select a name of your new output that describes it."}</p>}
                                   typeName={this.state.typeName}
                                   submitAction={this.handleSubmit} />
            </div>
        );
    },
    _openModal(evt) {
        if (this.state.typeName !== "placeholder" && this.state.typeName !== "") {
            this.refs.configurationForm.open();
        }
    },
    _formatOutputType(title, typeName) {
        return (<option key={typeName} value={typeName}>{title}</option>);
    },
    onTypeChange(evt) {
        var outputType = evt.target.value;
        this.setState({typeName: evt.target.value});
        OutputsStore.loadAvailable(outputType, (definition) => {
            this.setState({typeDefinition: definition.requested_configuration});
        });
    },
    handleSubmit(data) {
        OutputsStore.save(data, (result) => {
            if (this.state.streamId) {
                StreamsStore.addOutput(this.state.streamId, result.id, () => {
                    this.props.onUpdate();
                });
            } else {
                this.props.onUpdate();
            }
        });
    }
});

module.exports = CreateOutputDropdown;