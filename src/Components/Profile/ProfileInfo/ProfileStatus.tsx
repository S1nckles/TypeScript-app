import React from "react";
//@ts-ignore
import s from '../ProfileInfo/ProfileInfo.module.css';

type PropsType = {
    status: string
    updateStatus: () => void
}

type StateType = {
    status: string
    editMode: boolean
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode() {
        this.setState({
            editMode: false
        });
        this.props.updateStatus();
                        //this.state.status
    }

    onStatusChange = (e: { currentTarget: { value: any; }; }) => {
        this.setState( {
            status: e.currentTarget.value
        } ); 
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }    
    }

    render() {
        return (
            <div className={s.status}>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status || "-----------"}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} onBlur={this.deactivateEditMode.bind(this)} value={this.state.status} />
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;