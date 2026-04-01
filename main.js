// Chức năng thêm
// 1. Lấy thông tin từ người dùng (3 thông tin)
const fullNameInputElement = document.getElementById("name");
const emailInputElement = document.getElementById("email");
const ageInputElement = document.getElementById("age");
const btnAddElement = document.getElementById("btnAdd");
const tbodyElement = document.getElementById("tableBody");
const titleFormElement = document.getElementById("title-form");
const modalConfirmElement = document.getElementById("modal-confirm");
const iconCloseElement = document.getElementById("icon-close");
const btnCancelElement = document.getElementById("btn-cancel");
const btnConfirmedElement = document.getElementById("btn-confirmed");

// Các phần tử liên quan đến lỗi
const errorNameElement = document.getElementById("errorName");
const errorEmailElement = document.getElementById("errorEmail");
const errorAgeElement = document.getElementById("errorAge");

let flag = null; // Cờ lấy thông tin cần cập nhật
let indexDelete = null; // Lấy index cần xóa

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

// Mảng dữ liệu sinh viên
const students = JSON.parse(localStorage.getItem("students")) || [];

// Render danh sách sinh viên
const renderStudents = () => {
  // Duyệt qua mảng và gắn dữ liệu thật vào trong chuỗi tr
  let html = "";
  students.forEach((element, index) => {
    html += `
        <tr>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>${element.age}</td>
            <td>
                <button onclick="handleDelete(${index})">Xóa</button>
            </td>
            <td>
                <button onclick="handleEdit(${index})">Sửa</button>
            </td>
        </tr>
   `;
  });

  //  Gắn chuỗi html đã có dữ liệu vào thẻ tbody
  tbodyElement.innerHTML = html;
};

renderStudents();

// 2. Lắng nghe sự kiện khi nhấn vào nút Thêm mới
btnAddElement.addEventListener("click", () => {
  // Tạo cờ để xác định dữ liệu đã đúng định dạng chưa
  let inValid = true;

  // 3. Kiểm tra dữ liệu đầu vào
  if (!fullNameInputElement.value) {
    errorNameElement.textContent = "Tên không được để trống";
    inValid = false;
  } else {
    errorNameElement.textContent = "";
  }

  if (!emailInputElement.value) {
    errorEmailElement.textContent = "Email không được để trống";
    inValid = false;
  } else {
    // Nếu như email đã có giá trị, tiến hành kiểm tra định dạng
    if (!validateEmail(emailInputElement.value)) {
      errorEmailElement.textContent = "Email không đúng định dạng";
      inValid = false;
    } else {
      errorEmailElement.textContent = "";
    }
  }

  if (!ageInputElement.value) {
    errorAgeElement.textContent = "Tuổi không được để trống";
    inValid = false;
  } else {
    if (ageInputElement.value < 18 || ageInputElement.value > 150) {
      errorAgeElement.textContent = "Tuổi phải lớn hơn 18 và nhỏ hơn 150";
      inValid = false;
    } else {
      errorAgeElement.textContent = "";
    }
  }

  // 4. Kiểm tra xem các điều kiện đã thỏa mãn chưa?
  if (inValid) {
    if (!flag && flag !== 0) {
      // 5. Gom các dữ liệu từ Form thành 1 đối tượng
      const newStudent = {
        id: Math.ceil(Math.random() * 100000000),
        name: fullNameInputElement.value,
        email: emailInputElement.value,
        age: ageInputElement.value,
      };

      // 6. Thêm dữ liệu vào trong mảng
      students.unshift(newStudent);
    } else {
      // Cập nhật lại dữ liệu cho đối tượng bằng các giá trị mới
      // Truy cập vào phần tử của mảng theo vị trí (flag) để gán lại giá trị
      students[flag].name = fullNameInputElement.value;
      students[flag].email = emailInputElement.value;
      students[flag].age = ageInputElement.value;

      // Cập nhật lại tiêu đề
      titleFormElement.textContent = "Thêm mới sinh viên";
      btnAddElement.textContent = "Thêm sinh viên";
    }

    // 7. Lưu dữ liệu lên local
    localStorage.setItem("students", JSON.stringify(students));

    // 8. Render làm mới lại dữ liệu
    renderStudents();

    // 9. Reset lại Form
    fullNameInputElement.value = "";
    emailInputElement.value = "";
    ageInputElement.value = "";
  }
});

// Hàm đóng modal xác nhận xóa
const handleCloseModal = () => {
  modalConfirmElement.style.display = "none";
};

// Bắt sự kiện khi nhấn vào icon close, sẽ ẩn modal xác nhận xóa
iconCloseElement.addEventListener("click", () => {
  handleCloseModal();
});

// Bắt sự kiện khi nhấn vào nút hủy trong modal, sẽ ẩn modal xác nhận xóa
btnCancelElement.addEventListener("click", () => {
  handleCloseModal();
});

// Bắt sự kiện người dùng nhấn vào nút xác nhận trong modal xóa
btnConfirmedElement.addEventListener("click", () => {
  // Xóa phần tử khỏi mảng (splice)
  students.splice(indexDelete, 1);
  // Lưu dữ liệu lên local
  localStorage.setItem("students", JSON.stringify(students));
  // Render lại dữ liệu mới nhất
  renderStudents();
  // Đóng modal xác nhận xóa
  handleCloseModal();
});

// Hàm xóa sinh viên
const handleDelete = (index) => {
  // Mở modal xác nhận xóa
  modalConfirmElement.style.display = "flex";
};

// Hàm sửa thông tin sinh viên
const handleEdit = (index) => {
  // Thay đổi tiêu đề của form
  titleFormElement.textContent = "Cập nhật sinh viên";

  // Thay đổi tiêu đề của button
  btnAddElement.textContent = "Cập nhật";

  // Fill dữ liệu của sinh viên vào trong Form
  // Thông qua vị trí, lấy ra phần tử của mảng: ten_mang[vi_tri]

  // Cập nhật giá trị vừa từ mảng và cập nhật cho từng input
  fullNameInputElement.value = students[index].name;
  emailInputElement.value = students[index].email;
  ageInputElement.value = students[index].age;

  // Cập nhật flag để biết đây là hành động sửa
  flag = index; // gán lại để lấy ra giá trị vị trí cần chỉnh sửa
};
