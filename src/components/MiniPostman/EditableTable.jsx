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
            data: []
        }
    }

    render() {
        return (
            <MaterialTable
                title="Headers"
                columns={this.state.columns}
                data={this.state.data}
                options={{
                    search: false,
                    paging: false,
                    // showTitle: false,
                    rowStyle: {

                    }
                }}
                editable={{
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