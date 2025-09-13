import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

function App() {
  const [msg, setmsg] = useState("");
  const [status, setstatus] = useState(false);
  const [emailList, setEmailList] = useState([]);

  function handlemsg(evt) {
    setmsg(evt.target.value);
  }

  function handlefile(event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = function (e) {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const emailList = XLSX.utils.sheet_to_json(worksheet, { header: "A" });
      const totalemail = emailList.map(function (item) {
        return item.A;
      });
      console.log(totalemail);
      setEmailList(totalemail);
    };

    reader.readAsBinaryString(file);
  }

  function send() {
    setstatus(true);
    axios
      .post("http://localhost:5000/sendemail", { msg: msg, emailList: emailList })
      .then(function (data) {
        if (data.data === true) {
          alert("Email sent Successfully");
          setstatus(false);
        } else {
          alert("Failed");
        }
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
      {/* Decorative Gradient Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-overlay opacity-20 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-700 rounded-full mix-blend-overlay opacity-20 blur-3xl"></div>

      {/* Header */}
      <header className="relative text-center py-10">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg">
          🚀 BulkMail Pro
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 font-light">
          Send thousands of emails <span className="font-semibold text-blue-300">seamlessly</span> and{" "}
          <span className="font-semibold text-blue-300">instantly</span>.
        </p>
      </header>

      {/* Main Card */}
      <main className="relative z-10 max-w-4xl mx-auto bg-white text-gray-800 rounded-2xl shadow-2xl p-8 mt-10">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Compose & Send Bulk Emails
        </h2>

        {/* Textarea */}
        <textarea
          onChange={handlemsg}
          value={msg}
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none placeholder-gray-400 mb-6"
          placeholder="✍️ Write your email content here..."
        ></textarea>

        {/* File Upload */}
        <div className="flex justify-center">
          <label className="w-[80%] border-4 border-dashed border-gray-400 rounded-lg py-10 px-4 text-center cursor-pointer hover:border-blue-500 transition bg-gray-50 hover:bg-gray-100">
            <input
              type="file"
              onChange={handlefile}
              className="hidden"
            />
            <span className="text-gray-600 font-medium text-lg">
              📂 Drag & Drop or <span className="text-blue-600">Click</span> to Upload Excel
            </span>
          </label>
        </div>

        {/* Total Emails */}
        <p className="mt-5 text-center text-gray-700 font-medium">
          Total Emails Detected:{" "}
          <span className="text-blue-700 font-bold">{emailList.length}</span>
        </p>

        {/* Send Button */}
        <div className="flex justify-center">
          <button
            onClick={send}
            className="mt-6 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-indigo-900 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105"
          >
            {status ? "🚀 Sending..." : "📨 Send Emails"}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 text-center text-gray-300 text-sm pb-6">
        <p>
          &copy; {new Date().getFullYear()} <span className="font-semibold">BulkMail Pro</span>. Built with ❤️ for
          business growth.
        </p>
      </footer>
    </div>
  );
}

export default App;
