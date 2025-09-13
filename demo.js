const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", function(event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = function(e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' }); 
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName]; 

        const emailList = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log(emailList);
    };

    reader.readAsBinaryString(file);
});
