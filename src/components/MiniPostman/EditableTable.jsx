import React from 'react'
import MaterialTable from 'material-table'
class EditableTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Key', field: 'key' },
                { title: 'Value', field: 'value' }
            ],
            data: props.data ? props.data : [],
            title: props.title,
            editable: props.editable
        }
    }
    componentDidUpdate() {
        if (this.props.handleTableUpdateData) {
            this.props.handleTableUpdateData(this.state.data)
        }
    }

    render() {
        return (
            <MaterialTable
                title={this.state.title}
                columns={this.state.columns}
                data={this.state.data}
                options={{
                    search: false,
                    paging: false,
                }}
                editable={this.state.editable && {
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            {
                                const data = this.state.data;
                                data.push(newData);
                                this.setState({ data }, () => resolve());
                            }
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            {
                                const data = this.state.data;
                                const index = data.indexOf(oldData);
                                data[index] = newData;
                                this.setState({ data }, () => resolve());
                            }
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            {
                                let data = this.state.data;
                                const index = data.indexOf(oldData);
                                data.splice(index, 1);
                                this.setState({ data }, () => resolve());
                            }
                        }),
                }}
            />
        )
    }
}

export default EditableTable