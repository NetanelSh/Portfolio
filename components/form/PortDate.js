import React from "react";
import DatePicker from "react-datepicker";
import { FormGroup, Label, Button } from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";

export default class PortDate extends React.Component {
    constructor(props) {
        super(props);

        const dateValue = props.initialDate ? new Date(props.initialDate) : new Date;
        const isHidden = props.initialDate ? false : true;
        
        this.state = {
            dateValue,
            isHidden
        };

        this.handleChange = this.handleChange.bind(this);
        // this.setFieldValueAndTouched(new Date, true);
    }

    componentDidMount() {
        this.setState({  isBrowserLoaded: true })
    }

    setFieldValueAndTouched(date, touched) {
        const { setFieldValue, setFieldTouched } = this.props.form;
        const { name } = this.props.field;

        setFieldValue(name, date, true);
        setFieldTouched(name, touched, true);
    }

    handleChange(date) {

        this.setState({
            dateValue: date
        });
        
        this.setFieldValueAndTouched(date, true);
    }

    toggleDate(date) {

        this.setState({
            isHidden: !this.state.isHidden
        });

        this.setFieldValueAndTouched(date, true);
    }

    render() {

        const { isBrowserLoaded, isHidden, dateValue } = this.state;
        const { label, field, canBeDisable, form: { touched, errors} } = this.props;

        return (
            <FormGroup>
                <Label>{label}</Label>
                {
                    isBrowserLoaded && !isHidden &&
                    <div className="input-group">
                        <DatePicker
                            onChange={this.handleChange}
                            selected={dateValue}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            maxDate={new Date}
                        />
                    </div>
                }
                {!isHidden && canBeDisable && <Button onClick={ () => this.toggleDate(null) }>Still Working Here...</Button>}
                <br />
                {  
                    isHidden && canBeDisable &&
                    <React.Fragment>
                        <span>Still Working Here</span>{' '}
                        <Button onClick={() => this.toggleDate(dateValue)}>Set End Date</Button>
                    </React.Fragment>
                }
                {
                    touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>
                }
            </FormGroup>
        );
    }
}