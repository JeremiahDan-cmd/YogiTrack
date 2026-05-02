import React, { useState } from "react";
import "./App.css";

function App() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [communication, setCommunication] = useState("Email");
    const [customers, setCustomers] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [instFirstName, setInstFirstName] = useState("");
    const [instLastName, setInstLastName] = useState("");
    const [classes, setClasses] = useState([]);
    const [selectedInstructor, setSelectedInstructor] = useState("");
    const [day, setDay] = useState("");
    const [time, setTime] = useState("");
    const [classType, setClassType] = useState("General");
    const [payRate, setPayRate] = useState("");
    const [packages, setPackages] = useState([]);
    const [packageName, setPackageName] = useState("");
    const [packageCategory, setPackageCategory] = useState("General");
    const [numberOfClasses, setNumberOfClasses] = useState("1");
    const [packageClassType, setPackageClassType] = useState("General");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [price, setPrice] = useState("");
    const [sales, setSales] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [selectedPackage, setSelectedPackage] = useState("");
    const [amountPaid, setAmountPaid] = useState("");
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [selectedAttendanceClass, setSelectedAttendanceClass] = useState("");
    const [selectedAttendanceCustomer, setSelectedAttendanceCustomer] = useState("");

    const addCustomer = () => {
        if (
            firstName.trim() === "" ||
            lastName.trim() === "" ||
            address.trim() === "" ||
            phone.trim() === "" ||
            email.trim() === ""
        ) {
            alert("Please fill in all customer fields.");
            return;
        }

        const newCustomer = {
            id: `C${String(customers.length + 1).padStart(3, "0")}`,
            firstName,
            lastName,
            address,
            phone,
            email,
            communication,
            balance: 0
        };

        setCustomers([...customers, newCustomer]);

        setFirstName("");
        setLastName("");
        setAddress("");
        setPhone("");
        setEmail("");
        setCommunication("Email");
    };
    const addInstructor = () => {
        if (instFirstName.trim() === "" || instLastName.trim() === "") {
            alert("Please enter instructor name.");
            return;
        }

        const newInstructor = {
            id: `I${String(instructors.length + 1).padStart(3, "0")}`,
            firstName: instFirstName,
            lastName: instLastName
        };

        setInstructors([...instructors, newInstructor]);
        setInstFirstName("");
        setInstLastName("");
    };
    const addClass = () => {
        if (
            selectedInstructor === "" ||
            day === "" ||
            time === "" ||
            payRate === ""
        ) {
            alert("Please fill in all class fields.");
            return;
        }

        const newClass = {
            id: `CL${classes.length + 1}`,
            instructor: selectedInstructor,
            day,
            time,
            classType,
            payRate
        };

        setClasses([...classes, newClass]);

        setSelectedInstructor("");
        setDay("");
        setTime("");
        setClassType("General");
        setPayRate("");
    };
    const addPackage = () => {
        if (
            packageName.trim() === "" ||
            startDate === "" ||
            endDate === "" ||
            price === ""
        ) {
            alert("Please fill in all package fields.");
            return;
        }

        const newPackage = {
            id: `P${String(packages.length + 1).padStart(3, "0")}`,
            packageName,
            packageCategory,
            numberOfClasses,
            packageClassType,
            startDate,
            endDate,
            price
        };
        

        setPackages([...packages, newPackage]);

        setPackageName("");
        setPackageCategory("General");
        setNumberOfClasses("1");
        setPackageClassType("General");
        setStartDate("");
        setEndDate("");
        setPrice("");
    }; const recordSale = () => {
        if (
            selectedCustomer === "" ||
            selectedPackage === "" ||
            amountPaid === ""
        ) {
            alert("Please complete all sale fields.");
            return;
        }

        const pkg = packages.find((p) => p.id === selectedPackage);
        const customerIndex = customers.findIndex(
            (c) => c.id === selectedCustomer
        );

        if (!pkg || customerIndex === -1) {
            alert("Invalid customer or package.");
            return;
        }

        let classCount = 0;

        if (pkg.numberOfClasses === "Unlimited") {
            classCount = 999;
        } else {
            classCount = parseInt(pkg.numberOfClasses);
        }

        const updatedCustomers = [...customers];
        updatedCustomers[customerIndex].balance += classCount;

        setCustomers(updatedCustomers);

        const newSale = {
            id: `S${sales.length + 1}`,
            customer: selectedCustomer,
            package: selectedPackage,
            amountPaid
        };

        setSales([...sales, newSale]);

        setSelectedCustomer("");
        setSelectedPackage("");
        setAmountPaid("");
    };
    const recordAttendance = () => {
        if (
            selectedAttendanceClass === "" ||
            selectedAttendanceCustomer === ""
        ) {
            alert("Please select a class and a customer.");
            return;
        }

        const customerIndex = customers.findIndex(
            (c) => c.id === selectedAttendanceCustomer
        );

        if (customerIndex === -1) {
            alert("Customer not found.");
            return;
        }

        const updatedCustomers = [...customers];

        if (updatedCustomers[customerIndex].balance <= 0) {
            alert("Customer does not have enough class balance.");
            return;
        }

        updatedCustomers[customerIndex].balance -= 1;
        setCustomers(updatedCustomers);

        const newAttendance = {
            id: `A${attendanceRecords.length + 1}`,
            classId: selectedAttendanceClass,
            customerId: selectedAttendanceCustomer
        };

        setAttendanceRecords([...attendanceRecords, newAttendance]);

        setSelectedAttendanceClass("");
        setSelectedAttendanceCustomer("");
    };

    return (
        <div className="container">
            <h1>YogiTrack System</h1>

            <h2>Add Customer</h2>

            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />

            <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <select
                value={communication}
                onChange={(e) => setCommunication(e.target.value)}
            >
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
            </select>
            <button onClick={addCustomer}>Add Customer</button>
            <h2>Add Package</h2>

            <input
                type="text"
                placeholder="Package Name"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
            />

            <select
                value={packageCategory}
                onChange={(e) => setPackageCategory(e.target.value)}
            >
                <option value="General">General</option>
                <option value="Senior">Senior</option>
            </select>

            <select
                value={numberOfClasses}
                onChange={(e) => setNumberOfClasses(e.target.value)}
            >
                <option value="1">1</option>
                <option value="4">4</option>
                <option value="10">10</option>
                <option value="Unlimited">Unlimited</option>
            </select>

            <select
                value={packageClassType}
                onChange={(e) => setPackageClassType(e.target.value)}
            >
                <option value="General">General</option>
                <option value="Special">Special</option>
            </select>

            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />

            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <button onClick={addPackage}>Add Package</button>

            <h2>Package List</h2>
            <ul>
                {packages.map((pkg) => (
                    <li key={pkg.id}>
                        <strong>{pkg.id}</strong> - {pkg.packageName}
                        <br />
                        Category: {pkg.packageCategory}
                        <br />
                        Classes: {pkg.numberOfClasses}
                        <br />
                        Class Type: {pkg.packageClassType}
                        <br />
                        Start Date: {pkg.startDate}
                        <br />
                        End Date: {pkg.endDate}
                        <br />
                        Price: ${pkg.price}
                    </li>
                ))}
            </ul>
        


            

            <h2>Customer List</h2>
            <ul>
                {customers.map((customer) => (
                    <li key={customer.id}>
                        <strong>{customer.id}</strong> - {customer.firstName} {customer.lastName}
                        <br />
                        Address: {customer.address}
                        <br />
                        Phone: {customer.phone}
                        <br />
                        Email: {customer.email}
                        <br />
                        Preferred Contact: {customer.communication}
                        <br />
                         Balance: {customer.balance}
                    </li>
                ))}
            </ul>
            <h2>Add Instructor</h2>

            <input
                type="text"
                placeholder="First Name"
                value={instFirstName}
                onChange={(e) => setInstFirstName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Last Name"
                value={instLastName}
                onChange={(e) => setInstLastName(e.target.value)}
            />

            <button onClick={addInstructor}>Add Instructor</button>

            <h2>Instructor List</h2>
            <ul>
                {instructors.map((inst) => (
                    <li key={inst.id}>
                        {inst.id} - {inst.firstName} {inst.lastName}
                    </li>
                ))}
            </ul>
            <h2>Add Class</h2>

            <select
                value={selectedInstructor}
                onChange={(e) => setSelectedInstructor(e.target.value)}
            >
                <option value="">Select Instructor</option>
                {instructors.map((inst) => (
                    <option key={inst.id} value={inst.id}>
                        {inst.id} - {inst.firstName}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Day (e.g. Monday)"
                value={day}
                onChange={(e) => setDay(e.target.value)}
            />

            <input
                type="text"
                placeholder="Time (e.g. 9AM)"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />

            <select
                value={classType}
                onChange={(e) => setClassType(e.target.value)}
            >
                <option value="General">General</option>
                <option value="Special">Special</option>
            </select>

            <input
                type="number"
                placeholder="Pay Rate"
                value={payRate}
                onChange={(e) => setPayRate(e.target.value)}
            />

            <button onClick={addClass}>Add Class</button>

            <h2>Class List</h2>
            <ul>
                {classes.map((cls) => (
                    <li key={cls.id}>
                        {cls.id} | {cls.instructor} | {cls.day} @ {cls.time} | {cls.classType} | ${cls.payRate}
                    </li>
                ))}
            </ul>
            <h2>Record Sale</h2>

            <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
            >
                <option value="">Select Customer</option>
                {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.id} - {c.firstName}
                    </option>
                ))}
            </select>

            <select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
            >
                <option value="">Select Package</option>
                {packages.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.id} - {p.packageName}
                    </option>
                ))}
            </select>

            <input
                type="number"
                placeholder="Amount Paid"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
            />

            <button onClick={recordSale}>Record Sale</button>

            <h2>Sales List</h2>
            <ul>
                {sales.map((s) => (
                    <li key={s.id}>
                        {s.id} | Customer: {s.customer} | Package: {s.package} | ${s.amountPaid}
                    </li>
                ))}
            </ul>
            <h2>Record Attendance</h2>

            <select
                value={selectedAttendanceClass}
                onChange={(e) => setSelectedAttendanceClass(e.target.value)}
            >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                        {cls.id} - {cls.day} @ {cls.time}
                    </option>
                ))}
            </select>

            <select
                value={selectedAttendanceCustomer}
                onChange={(e) => setSelectedAttendanceCustomer(e.target.value)}
            >
                <option value="">Select Customer</option>
                {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.id} - {c.firstName} {c.lastName}
                    </option>
                ))}
            </select>

            <button onClick={recordAttendance}>Record Attendance</button>

            <h2>Attendance List</h2>
            <ul>
                {attendanceRecords.map((record) => (
                    <li key={record.id}>
                        {record.id} | Class: {record.classId} | Customer: {record.customerId}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;