import React from "react";
import ReactDOM from "react-dom";
import { Input, Dropdown, Button } from "semantic-ui-react";
import { customerLookUp,companyLookUp } from '../../utils/services';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import 'semantic-ui-css/semantic.min.css';
import "./CustomerSearchPage.module.css";
import toast from 'react-hot-toast';

export default class CustomerSearchPage extends React.Component {
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
          selectedCompany: "",
          companyOptions: []   // State to store options for the dropdown
        };
      }
    
      componentDidMount() {
        this.fetchInitialData();
        this.fetchCompanyOptions();
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

      fetchCompanyOptions = async () => {
        try {
          const response = await companyLookUp(""); 
          
          if (response.status === 200) {

             
            // Map response data to match Semantic UI Dropdown options format
            const options = response.data.map(company => ({
              key: company.id,  // Assuming companyId or a unique identifier
              value: company.companyName,
              text: company.companyName
            }));
            // Add a default option
            const defaultOption = { key: 'default', value: '', text: 'Select a Company' };
            options.unshift(defaultOption);
            this.setState({ companyOptions: options });
          } else {
            toast.error('Failed to fetch company options');
          }
        } catch (error) {
          console.error('Error fetching company options:', error);
          toast.error('Failed to fetch company options');
        }
      };
    
      handleInputChange = (e) => {
        this.setState({ searchInput: e.target.value,
                        selectedCompany: ''
         });

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
    let { data, columns, searchInput, selectedCompany, companyOptions } = this.state;
    return (
      <div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <Input
            size="medium"
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
ReactDOM.render(<CustomerSearchPage />, rootElement);
