const students = [
  { id: 1, name: "Nguyễn Văn A", age: 20, email: "nva1@gmail.com" },
  { id: 2, name: "Trần Thị B", age: 21, email: "ttb2@gmail.com" },
  { id: 3, name: "Lê Văn C", age: 22, email: "lvc3@gmail.com" },
  { id: 4, name: "Phạm Thị D", age: 20, email: "ptd4@gmail.com" },
  { id: 5, name: "Hoàng Văn E", age: 23, email: "hve5@gmail.com" },
  { id: 6, name: "Vũ Thị F", age: 21, email: "vtf6@gmail.com" },
  { id: 7, name: "Đặng Văn G", age: 22, email: "dvg7@gmail.com" },
  { id: 8, name: "Bùi Thị H", age: 20, email: "bth8@gmail.com" },
  { id: 9, name: "Đỗ Văn I", age: 23, email: "dvi9@gmail.com" },
  { id: 10, name: "Ngô Thị K", age: 21, email: "ntk10@gmail.com" },
  { id: 11, name: "Phan Văn L", age: 22, email: "pvl11@gmail.com" },
  { id: 12, name: "Trịnh Thị M", age: 20, email: "ttm12@gmail.com" },
  { id: 13, name: "Lý Văn N", age: 23, email: "lvn13@gmail.com" },
  { id: 14, name: "Hồ Thị O", age: 21, email: "hto14@gmail.com" },
  { id: 15, name: "Mai Văn P", age: 22, email: "mvp15@gmail.com" },
  { id: 16, name: "Dương Thị Q", age: 20, email: "dtq16@gmail.com" },
  { id: 17, name: "Đinh Văn R", age: 23, email: "dvr17@gmail.com" },
  { id: 18, name: "Lưu Thị S", age: 21, email: "lts18@gmail.com" },
  { id: 19, name: "Tạ Văn T", age: 22, email: "tvt19@gmail.com" },
  { id: 20, name: "Nguyễn Thị U", age: 20, email: "ntu20@gmail.com" },
  { id: 21, name: "Nguyễn Thị Y", age: 21, email: "nty20@gmail.com" },
  { id: 22, name: "Nguyễn Thị J", age: 22, email: "nty20@gmail.com" },
];

console.log("Cắt mảng: ", students.slice(10, 20));

const tbodyElement = document.getElementById("tbody");
const buttonNumberElement = document.getElementById("button-number");
const btnPrevElement = document.getElementById("btn-prev");
const btnNextElement = document.getElementById("btn-next");

let itemPerPage = 10;
let currentPage = 1;

const renderData = () => {
  // Xác định điểm bắt đầu
  let start = (currentPage - 1) * itemPerPage;

  // Xác định điểm kết thúc
  let end = currentPage * itemPerPage;

  //   Cắt mảng thông qua phương thức slice
  const studentSliced = students.slice(start, end);

  let html = "";
  studentSliced.forEach((element, index) => {
    html += `
            <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.age}</td>
            <td>${element.email}</td>
            </tr>
        `;
  });

  //   Gán đoạn mã HTML đã có dữ liệu vào tbody
  tbodyElement.innerHTML = html;
};

// Render danh sách các nút phân trang dựa vào tổng só bản ghi và số lượng bản ghi/trang
const renderButtonPagination = () => {
  // Tổng số trang
  const totalPage = Math.ceil(students.length / itemPerPage);

  //   Render ra danh sách các nút phân trang
  let buttonHtml = "";
  for (let i = 1; i <= totalPage; i++) {
    buttonHtml += `<button class="${currentPage === i ? "btn-active" : ""}" onclick="handleChangePage(${i})">${i}</button>`;
  }

  buttonNumberElement.innerHTML = buttonHtml;

  //   Nếu như đang ở trang 1 thì sẽ disable nút Prev
  if (currentPage === 1) {
    btnPrevElement.setAttribute("disabled", "true");
  } else {
    btnPrevElement.removeAttribute("disabled");
  }

  //   Nếu như trang hiện tại = tổng số trang thì sẽ disable nút Next
  if (currentPage === Math.ceil(students.length / itemPerPage)) {
    btnNextElement.setAttribute("disabled", "true");
  } else {
    btnNextElement.removeAttribute("disabled");
  }
};

const handleChangePage = (page) => {
  //  Cập nhật lại trang hiện tại
  currentPage = page;

  //   Gọi hàm để render lại dữ liệu mới nhất
  renderData();

  // Gọi hàm render danh sách các nút phân trang
  renderButtonPagination();
};

// Bắt sự kiện quay lại trang trước đó
btnPrevElement.addEventListener("click", () => {
  if (currentPage > 1) {
    // Giảm trang hiện tại đi 1 đơn vị
    currentPage -= 1;

    //   Gọi hàm để render lại dữ liệu mới nhất
    renderData();

    // Gọi hàm render danh sách các nút phân trang
    renderButtonPagination();
  }
});

// Bắt sự kiện chuyển đến trang tiếp theo
btnNextElement.addEventListener("click", () => {
  // Tổng số trang
  const totalPage = Math.ceil(students.length / itemPerPage);
  if (currentPage < totalPage) {
    // Giảm trang hiện tại đi 1 đơn vị
    currentPage += 1;

    //   Gọi hàm để render lại dữ liệu mới nhất
    renderData();

    // Gọi hàm render danh sách các nút phân trang
    renderButtonPagination();
  }
});

renderButtonPagination();

renderData();
