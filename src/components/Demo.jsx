import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Axios from "axios";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

export default function Demo() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const toast = useRef(null);

  const handleRegister = async () => {
    try {
      const response = await Axios.post(
        import.meta.env.VITE_API_URL + `/users/Signup`,
        {
          temp_username: username,
          temp_password: password,
          temp_fname: firstName,
          temp_lname: lastName,
          temp_email: email,
          temp_phone: mobileNumber,
        }
      );
      console.log("response", response.data.text.message);

      if (response.data.text.message === "Already exit") {
        show();
      }

      if (response.data.text.message === "User signup successful") {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "User Registered Successful",
        });
        setFirstName("");
        setLastName("");
        setUsername("");
        setMobileNumber("");
        setEmail("");
        setPassword("");
      }
      setUsers(response.user);
      fetchUsers();
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await Axios.get(
        import.meta.env.VITE_API_URL + `/users/fetchData`
      );
      console.log("Fetched users:", response.data.text.data);
      setUsers(response.data.text.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const show = () => {
    toast.current.show({
      severity: "warn",
      summary: "Warning",
      detail: "User Already Exist",
    });
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <div className="flex h-screen flex-row justify-content-center w-full overflow-hidden">
          <div className="w-full flex flex-column align-items-center justify-content-center gap-3 py-5">
            <div className="flex flex-column gap-3">
              <p>Basic Info</p>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-column gap-3">
              <p>Credentials</p>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button
              label="Register"
              icon="pi pi-user"
              severity="success"
              className="w-10rem mx-auto"
              onClick={handleRegister}
            ></Button>
          </div>
          <div className="w-full md:w-2">
            <Divider layout="vertical" className="hidden md:flex"></Divider>
          </div>
          <div className="w-full flex align-items-center justify-content-center py-5">
            <DataTable value={users} showGridlines scrollable>
              <Column
                field="refUserCustId"
                header="ID"
                frozen
                style={{ minWidth: "3rem" }}
              ></Column>
              <Column
                field="refUserName"
                header="Username"
                frozen
                style={{ minWidth: "3rem" }}
              ></Column>
              <Column
                field="refUserFname"
                header="First Name"
                style={{ minWidth: "10rem" }}
              ></Column>
              <Column
                field="refUserLname"
                header="Last Name"
                style={{ minWidth: "10rem" }}
              ></Column>
              <Column
                field="refMobileno"
                header="Mobile Number"
                style={{ minWidth: "10rem" }}
              ></Column>
              <Column
                field="refEmail"
                header="Email ID"
                style={{ minWidth: "10rem" }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}
