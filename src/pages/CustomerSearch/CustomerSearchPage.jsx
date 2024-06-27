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
      data: originalData,
      columns: [],
      searchInput: "",
      selectedCompany: ""
    };
  }

  

  componentDidMount() {
    let columns = [
      {
        Header: "First Name",
        accessor: "firstName",
        sortable: true,
        show: true,
        displayValue: " First Name"
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        sortable: true,
        show: true,
        displayValue: "Last Name "
      },
      {
        Header: "Company",
        accessor: "company",
        sortable: true,
        show: true,
        displayValue: " Company "
      }
    ];
    this.setState({ columns });
    originalData = [
        { firstName: "Marcos", lastName: "Pending", company: 155 },
        { firstName: "James", lastName: "Pending", company: 155 },
        { firstName: "Juanita", lastName: "Approved", company: 1785 },
        { firstName: "Gabby", lastName: "Approved", company: 175 },
        { firstName: "adaSaaa", lastName: "Cancelled", company: 165 },
        { firstName: "aasaaa", lastName: "Cancelled", company: 157 },
        { firstName: "aweaaaaaewea", lastName: "Approved", company: 153 },
        { firstName: "aaaaaa", lastName: "Submitted", company: 155 },
        { firstName: "aaaeweaa", lastName: "Pending", company: 1555 },
        { firstName: "aabFaa", lastName: "Submitted", company: 155 },
        { firstName: "adaAAadsdweaa", lastName: "Approved", company: 17585 },
        { firstName: "aAaaaa", lastName: "Approved", company: 175 }
        ];

  }

    handleSubmit = async (e) => {
        e.preventDefault();
        const response = await customerLookUp(e.target.value);
        
        if (response?.status === 201) {
        toast.success('Thank you for your interest in Fixadera! Use your email on your first scheduled session and you will receive 20% off!');

        }
        else if (response?.status === 401) {
        toast.error('A cupon is already associated with this e-mail. No e-mail is sent. Simply use the same e-mail you entered to automatically recieve the discount.');
        }
        else{
        toast.error('Unable to give cupon. Please try again.');
        }
        
        this.setState({ searchInput: e.target.value }, () => {
        this.globalSearch();
        });
  };

  handleCompanyChange = (e, { value }) => {
    this.setState({ selectedCompany: value }, () => {
      this.globalSearch();
    });
  };

  globalSearch = () => {
    let { searchInput, selectedCompany } = this.state;
    let filteredData = originalData.filter(value => {
      return (
        (value.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.lastName.toLowerCase().includes(searchInput.toLowerCase())) &&
        (!selectedCompany || value.company.toString() === selectedCompany.toString())
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
