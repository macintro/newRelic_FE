import React from "react";
import ReactDOM from "react-dom";
import { Input, Dropdown, Button } from "semantic-ui-react";
import { customerLookUp } from '../../utils/services';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import 'semantic-ui-css/semantic.min.css';
import "./CustomerSearchPage.module.css";
import toast from 'react-hot-toast';

var originalData = [];


const companyOptions = [
  { key: 155, value: 155, text: 'Company 155' },
  { key: 1785, value: 1785, text: 'Company 1785' },
  { key: 175, value: 175, text: 'Company 175' },
  { key: 165, value: 165, text: 'Company 165' },
  { key: 157, value: 157, text: 'Company 157' },
  { key: 153, value: 153, text: 'Company 153' },
  { key: 1555, value: 1555, text: 'Company 1555' },
  { key: 17585, value: 17585, text: 'Company 17585' }
];

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          columns: [
            {
              Header: "First Name",
              accessor: "fName",
              sortable: true,
              show: true,
              displayValue: " First Name"
            },
            {
              Header: "Last Name",
              accessor: "lName",
              sortable: true,
              show: true,
              displayValue: "Last Name "
            },
            {
              Header: "Company",
              accessor: "companyName",
              sortable: true,
              show: true,
              displayValue: " Company "
            }
          ],
          searchInput: "",
          selectedCompany: ""
        };
      }
    
      componentDidMount() {
        this.fetchInitialData();
      }
    
      fetchInitialData = async () => {
        try {
          const response = await customerLookUp(""); // Fetch initial data, pass empty string or default search term
    
          if (response.status === 200) {
            this.setState({
              data: response.data  // Assuming response.data contains the initial data
            }, () => {
              this.globalSearch();  // Trigger globalSearch after updating state if needed
            });
          } else {
            toast.error('Failed to fetch initial data');
          }
        } catch (error) {
          console.error('Error fetching initial data:', error);
          toast.error('Failed to fetch initial data');
        }
      };
    
      handleInputChange = (e) => {
        this.setState({ searchInput: e.target.value });
      };
    
      handleSubmit = async (e) => {
        e.preventDefault();
        const { searchInput } = this.state;
       
        try {
          const response = await customerLookUp(searchInput);
          if (response.status === 200) {
            this.setState({
              data: response.data  // Update data state with search results
            }, () => {
              this.globalSearch();  // Trigger globalSearch after updating state
            });
          } else {
            toast.error('No data could be loaded');
          }
        } catch (error) {
          console.error('Error searching:', error);
          toast.error('Failed to search');
        }
      };
    
      handleCompanyChange = (e, { value }) => {
        this.setState({ selectedCompany: value }, () => {
          this.globalSearch();
        });
      };
    
      globalSearch = () => {
        let { searchInput, selectedCompany, data } = this.state;
        let filteredData = data.filter(value => {
          return (
            (value.fName?.toLowerCase().includes(searchInput?.toLowerCase()) ||
            value.lName?.toLowerCase().includes(searchInput?.toLowerCase())) &&
            (!selectedCompany || value.companyName.toString() === selectedCompany.toString())
          );
        });
        this.setState({ data: filteredData });
      };
    
  render() {
    let { data, columns, searchInput, selectedCompany } = this.state;
    return (
      <div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <Input
            size="large"
            name="searchInput"
            value={searchInput || ""}
            onChange={this.handleInputChange}
            label="Search"
            placeholder="Search by first or last name"
          />
          <br />
          <br />
          <Dropdown
            placeholder="Select Company"
            fluid
            selection
            options={companyOptions}
            value={selectedCompany}
            onChange={this.handleCompanyChange}
          />
          <br />
          <Button type="submit">Search</Button>
        </form>
        <br />
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}
          className="table -striped -highlight"
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
