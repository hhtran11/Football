// PENALTY MASTER: Nâng cấp với 50 câu hỏi và trợ giúp!
// === CẤU HÌNH SUPABASE ===
const SUPABASE_URL = 'https://djkmfemvlscwhuflghsm.supabase.co'.trim();
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqa21mZW12bHNjd2h1ZmxnaHNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MTczMDAsImV4cCI6MjA5MTI5MzMwMH0.xgtNymE3c8J1Da-BdsHMn4gVmM3FGGYfb1ZbOvVYq7w'.trim();

let supabaseClient;
try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log("Supabase Client đã khởi tạo thành công!");
} catch (e) {
    console.error("Lỗi khởi tạo Supabase:", e);
    alert("Không thể kết nối với Supabase. Hãy kiểm tra lại URL và Key!");
}
// =========================

// Ngân hàng 50 câu hỏi Python
const questionBank = [
    { m: "In ra chuỗi 'Hello'", r: /print\s*\(\s*['\"]Hello['\"]\s*\)/, h: "Sử dụng hàm print('Hello')", w: "Nhà thông thái: 'Bạn cần hàm print và nội dung nằm trong ngoặc nháy nhé!'" },
    { m: "In ra số 2026", r: /print\s*\(\s*2026\s*\)/, h: "print(2026)", w: "Số thì không cần dấu nháy đâu em!" },
    { m: "In giá trị của biến x", r: /print\s*\(\s*x\s*\)/, h: "print(x)", w: "Nhà thông thái: 'In biến thì chỉ cần bỏ tên biến vào ngoặc thôi.'" },
    { m: "In nhiều giá trị: 'A' và 'B'", r: /print\s*\(\s*['\"]A['\"]\s*,\s*['\"]B['\"]\s*\)/, h: "print('A', 'B')", w: "Dùng dấu phẩy để in nhiều thứ cùng lúc nhé." },
    { m: "Tạo biến x có giá trị 5", r: /\bx\s*=\s*5\b/, h: "x = 5", w: "Dùng dấu = để gán giá trị cho biến." },
    { m: "Tạo biến y có giá trị 20", r: /\by\s*=\s*20\b/, h: "y = 20", w: "Tên biến bên trái, giá trị bên phải." },
    { m: "Gán giá trị biến y cho x", r: /\bx\s*=\s*y\b/, h: "x = y", w: "Lệnh này sẽ copy giá trị từ y sang x." },
    { m: "Tạo biến name là 'Python'", r: /name\s*=\s*['\"]Python['\"]/, h: "name = 'Python'", w: "Chuỗi ký tự bắt buộc phải có dấu nháy." },
    { m: "Thực hiện phép cộng 2 + 3", r: /2\s*\+\s*3/, h: "2 + 3", w: "Dùng dấu + thông thường thôi." },
    { m: "Thực hiện phép trừ 5 - 2", r: /5\s*-\s*2/, h: "5 - 2", w: "Toán tử trừ là dấu gạch ngang -." },
    { m: "Thực hiện phép nhân 4 nhân 3", r: /4\s*\*\s*3/, h: "Sử dụng dấu *", w: "Lưu ý: Trong lập trình nhân là dấu sao *." },
    { m: "Thực hiện phép chia 10 cho 2", r: /10\s*\/\s*2/, h: "Sử dụng dấu /", w: "Phép chia dùng dấu xuyệt phải /." },
    { m: "Chia lấy phần nguyên 10 cho 3", r: /10\s*\/\/\s*3/, h: "Sử dụng dấu //", w: "Dùng hai dấu // để lấy phần nguyên (ví dụ 10//3 được 3)." },
    { m: "Chia lấy phần dư 10 cho 3", r: /10\s*%\s*3/, h: "Sử dụng dấu %", w: "Dấu % giúp lấy phần dư của phép chia." },
    { m: "Tính lũy thừa 2 mũ 3", r: /2\s*\*\*\s*3/, h: "Sử dụng dấu **", w: "Dùng hai dấu sao ** để tính số mũ nhé." },
    { m: "Tạo một chuỗi tên 'python'", r: /['\"]python['\"]/, h: "Bao quanh bởi dấu nháy", w: "Chuỗi có thể dùng nháy đơn hoặc nháy kép." },
    { m: "Nối chuỗi 'abc' và 'def'", r: /['\"]abc['\"]\s*\+\s*['\"]def['\"]/, h: "'abc' + 'def'", w: "Dùng dấu + để dính các chuỗi lại với nhau." },
    { m: "Đếm số ký tự trong chuỗi 'code'", r: /len\s*\(\s*['\"]code['\"]\s*\)/, h: "len('code')", w: "len là viết tắt của length (độ dài)." },
    { m: "Lặp lại chuỗi 'Hi' 3 lần", r: /['\"]Hi['\"]\s*\*\s*3/, h: "'Hi' * 3", w: "Dấu * với chuỗi sẽ làm nó lặp lại." },
    { m: "Viết hoa chuỗi s", r: /s\.upper\s*\(\s*\)/, h: "s.upper()", w: "Hàm .upper() sẽ biến tất cả thành chữ hoa." },
    { m: "Hàm nhập dữ liệu từ phím", r: /input\s*\(\s*\)/, h: "Sử dụng input()", w: "Hàm này dùng để nhận tương tác từ người dùng." },
    { m: "Gán x bằng dữ liệu nhập vào", r: /\bx\s*=\s*input\s*\(\s*\)/, h: "x = input()", w: "Nhà thông thái: 'Đừng quên cặp ngoặc đơn sau input nhé!'" },
    { m: "Nhập kèm lời mời 'Nhập tên:'", r: /input\s*\(\s*['\"]Nhập tên:['\"]\s*\)/, h: "input('Nhập tên:')", w: "Bạn có thể đưa lời mời vào trong hàm input." },
    { m: "Kiểm tra x có bằng 5 không", r: /\bx\s*==\s*5\b/, h: "Dùng dấu ==", w: "Một dấu = là gán, hai dấu == là so sánh bằng." },
    { m: "Kiểm tra x có khác 10 không", r: /\bx\s*!=\s*10\b/, h: "Dùng dấu !=", w: "Dấu chấm than và dấu bằng có nghĩa là 'không bằng'." },
    { m: "Kiểm tra x lớn hơn 3", r: /\bx\s*>\s*3\b/, h: "x > 3", w: "Dùng toán tử so sánh lớn hơn >." },
    { m: "Kiểm tra x nhỏ hơn hoặc bằng 7", r: /\bx\s*<=\s*7\b/, h: "x <= 7", w: "Dấu nhỏ hơn viết trước, dấu bằng viết sau." },
    { m: "Cấu trúc if cơ bản", r: /if\s+.+:/, h: "if điều_kiện:", w: "Nhà thông thái: 'Dấu hai chấm ở cuối dòng if là bắt buộc!'" },
    { m: "Nếu x bằng 5 thì...", r: /if\s+x\s*==\s*5\s*:/, h: "if x == 5:", w: "Đừng quên hai dấu bằng và dấu hai chấm nhé." },
    { m: "Kiểm tra nếu x dương (x > 0)", r: /if\s+x\s*>\s*0\s*:/, h: "if x > 0:", w: "Điều kiện nằm giữa if và dấu hai chấm." },
    { m: "Tạo dãy số từ 0 đến 4", r: /range\s*\(\s*5\s*\)/, h: "range(5)", w: "Hàm range(n) tạo dãy từ 0 đến n-1." },
    { m: "Vòng lặp for lặp 10 lần", r: /for\s+\w+\s+in\s+range\s*\(\s*10\s*\)\s*:/, h: "for i in range(10):", w: "Cấu trúc vòng lặp for cần dấu hai chấm." },
    { m: "Vòng lặp while x nhỏ hơn 5", r: /while\s+x\s*<\s*5\s*:/, h: "while x < 5:", w: "While sẽ lặp chừng nào điều kiện còn đúng." },
    { m: "Tạo một list rỗng tên a", r: /\ba\s*=\s*\[\s*\]/, h: "a = []", w: "Dùng ngoặc vuông [] để tạo danh sách." },
    { m: "Tạo list có 3 số: 1, 2, 3", r: /\[\s*1\s*,\s*2\s*,\s*3\s*\]/, h: "[1, 2, 3]", w: "Các phần tử ngăn cách nhau bởi dấu phẩy." },
    { m: "Thêm số 10 vào cuối list a", r: /a\.append\s*\(\s*10\s*\)/, h: "a.append(10)", w: "Hàm .append() dùng để thêm phần tử vào list." },
    { m: "Xóa hết các phần tử trong list a", r: /a\.clear\s*\(\s*\)/, h: "a.clear()", w: "Clear sẽ làm sạch danh sách của bạn." },
    { m: "Lấy phần tử đầu tiên của list a", r: /a\s*\[\s*0\s*\]/, h: "a[0]", w: "Trong Python, vị trí đầu tiên là số 0." },
    { m: "Định nghĩa hàm tên 'hello'", r: /def\s+hello\s*\(\s*\)\s*:/, h: "def hello():", w: "Dùng từ khóa def để tạo hàm mới." },
    { m: "Gọi thực thi hàm hello()", r: /hello\s*\(\s*\)/, h: "hello()", w: "Viết tên hàm kèm cặp ngoặc để chạy nó." },
    { m: "Ép kiểu x sang số nguyên", r: /int\s*\(\s*x\s*\)/, h: "int(x)", w: "Hàm int() giúp chuyển đổi sang kiểu số nguyên." },
    { m: "Ép kiểu x sang số thực", r: /float\s*\(\s*x\s*\)/, h: "float(x)", w: "Hàm float() dùng cho số thập phân." },
    { m: "Ép kiểu x sang chuỗi", r: /str\s*\(\s*x\s*\)/, h: "str(x)", w: "Hàm str() biến mọi thứ thành chữ." },
    { m: "Viết một dòng ghi chú (comment)", r: /#.+/, h: "Dùng dấu #", w: "Bất cứ thứ gì sau dấu # sẽ không bị máy tính chạy." },
    { m: "Giá trị Đúng trong Logic", r: /\bTrue\b/, h: "True", w: "Lưu ý: Python viết hoa chữ T trong True." },
    { m: "Giá trị Sai trong Logic", r: /\bFalse\b/, h: "False", w: "Lưu ý: Python viết hoa chữ F trong False." },
    { m: "Kiểm tra kiểu dữ liệu của x", r: /type\s*\(\s*x\s*\)/, h: "type(x)", w: "Hàm type giúp bạn biết x là số hay chuỗi." },
    { m: "Thoát vòng lặp lập tức", r: /\bbreak\b/, h: "break", w: "Dùng lệnh break để dừng vòng lặp ngay chưa cần xong." }
];

// Fallback trắc nghiệm Module 1 (lấy theo nội dung module_1.json)
const module1McqFallback = [
    { q: "Lệnh nào dùng để in ra màn hình?", opts: ["show()", "print()", "input()", "write()"], ans: 1 },
    { q: "Lệnh nào dùng để nhập dữ liệu từ bàn phím?", opts: ["get()", "scan()", "input()", "read()"], ans: 2 },
    { q: "Biến nào sau đây là hợp lệ?", opts: ["1so", "so-1", "so_1", "so 1"], ans: 2 },
    { q: "Kiểu dữ liệu nào là số nguyên?", opts: ["3.5", "\"3\"", "3", "'3.0'"], ans: 2 },
    { q: "Toán tử nào dùng để so sánh bằng?", opts: ["=", "==", "!=", "<="], ans: 1 },
    { q: "Vòng lặp nào dùng khi chưa biết trước số lần lặp?", opts: ["for", "while", "if", "elif"], ans: 1 },
    { q: "Lệnh nào thêm phần tử vào cuối danh sách?", opts: ["add()", "append()", "insert()", "push()"], ans: 1 },
    { q: "Danh sách nào hợp lệ?", opts: ["(1,2,3)", "{1,2,3}", "[1,2,3]", "<1,2,3>"], ans: 2 },
    { q: "Lệnh nào dùng để kết thúc sớm một vòng lặp?", opts: ["stop", "exit", "break", "continue"], ans: 2 },
    { q: "Hàm nào dùng để lấy độ dài của một danh sách?", opts: ["size()", "count()", "length()", "len()"], ans: 3 },
    { q: "Cấu trúc nào dùng để kiểm tra điều kiện?", opts: ["if...else", "for...in", "while", "def"], ans: 0 },
    { q: "Lệnh nào dùng để định nghĩa một hàm?", opts: ["function", "def", "func", "define"], ans: 1 },
    { q: "Kết quả của: 2 ** 3 là gì?", opts: ["6", "8", "9", "5"], ans: 1 },
    { q: "Danh sách (List) trong Python có thể chứa nhiều kiểu dữ liệu khác nhau không?", opts: ["Có", "Không", "Chỉ chứa số", "Chỉ chứa chuỗi"], ans: 0 },
    { q: "Hàm input() trả về kiểu dữ liệu gì?", opts: ["int", "string", "float", "bool"], ans: 1 }
];

// Ngân hàng câu hỏi Module 2: Cấu trúc dữ liệu & Giải thuật
const questionBank2 = [
    { m: "Thêm 'Cam' vào tập hợp (set) s", r: /s\.add\s*\(\s*['\"]Cam['\"]\s*\)/, h: "s.add('Cam')", w: "Set dùng hàm .add để thêm phần tử mới." },
    { m: "Xóa 'Táo' khỏi tập hợp s", r: /s\.remove\s*\(\s*['\"]Táo['\"]\s*\)/, h: "s.remove('Táo')", w: "Dùng .remove để xóa phần tử cụ thể." },
    { m: "Tạo dictionary d có key 'id' bằng 1", r: /d\s*=\s*\{\s*['\"]id['\"]\s*:\s*1\s*\}/, h: "d = {'id': 1}", w: "Dictionary dùng ngoặc nhọn và cặp key:value." },
    { m: "Lấy giá trị của key 'name' trong d", r: /d\s*\[\s*['\"]name['\"]\s*\]|d\.get\s*\(\s*['\"]name['\"]\s*\)/, h: "d['name'] hoặc d.get('name')", w: "Bạn có thể dùng ngoặc vuông hoặc hàm .get()." },
    { m: "Lấy danh sách tất cả các key của d", r: /d\.keys\s*\(\s*\)/, h: "d.keys()", w: "Hàm này trả về toàn bộ 'tên' các mục trong dict." },
    { m: "Kiểm tra 'age' có trong d không", r: /['\"]age['\"]\s+in\s+d/, h: "'age' in d", w: "Dùng từ khóa 'in' để kiểm tra sự tồn tại." },
    { m: "Tạo tuple t có 2 số: 10, 20", r: /t\s*=\s*\(\s*10\s*,\s*20\s*\)/, h: "t = (10, 20)", w: "Tuple dùng ngoặc đơn và không thể thay đổi sau khi tạo." },
    { m: "Lấy phần tử cuối của list a", r: /a\s*\[\s*-1\s*\]/, h: "a[-1]", w: "Chỉ số âm lùi từ cuối list lên đầu." },
    { m: "Cắt list a từ đầu đến phần tử thứ 3", r: /a\s*\[\s*:\s*3\s*\]/, h: "a[:3]", w: "Dùng kỹ thuật slicing với dấu hai chấm." },
    { m: "Đảo ngược list a", r: /a\.reverse\s*\(\s*\)/, h: "a.reverse()", w: "Dùng hàm reverse hoặc kỹ thuật slicing [::-1]." },
    { m: "Sắp xếp list a tăng dần", r: /a\.sort\s*\(\s*\)/, h: "a.sort()", w: "Hàm sort() sẽ thay đổi list gốc." },
    { m: "Hợp (union) hai tập hợp s1, s2", r: /s1\.union\s*\(\s*s2\s*\)|s1\s*\|\s*s2/, h: "s1.union(s2)", w: "Hợp là gộp tất cả phần tử không trùng lặp." },
    { m: "Giao (intersection) s1, s2", r: /s1\.intersection\s*\(\s*s2\s*\)|s1\s*&\s*s2/, h: "s1.intersection(s2)", w: "Giao là lấy các phần tử chung của cả hai." },
    { m: "Cập nhật key 'score' trong d thành 100", r: /d\s*\[\s*['\"]score['\"]\s*\]\s*=\s*100/, h: "d['score'] = 100", w: "Gán giá trị mới giống như biến thông thường." },
    { m: "Tính tổng các phần tử trong list a", r: /sum\s*\(\s*a\s*\)/, h: "sum(a)", w: "Hàm sum() cực kỳ tiện lợi trong Python." },
    { m: "Tìm số lớn nhất trong list a", r: /max\s*\(\s*a\s*\)/, h: "max(a)", w: "Sử dụng hàm max() nhé." },
    { m: "Xóa phần tử cuối list a và trả về nó", r: /a\.pop\s*\(\s*\)/, h: "a.pop()", w: "Hàm pop() mặc định xóa phần tử cuối." },
    { m: "Lồng 2 list: [1, [2, 3]]", r: /\[\s*1\s*,\s*\[\s*2\s*,\s*3\s*\]\s*\]/, h: "[1, [2, 3]]", w: "List có thể chứa các list khác bên trong." },
    { m: "Dạng List Comprehension: [i for i in a]", r: /\[\s*\w+\s+for\s+\w+\s+in\s+.*\s*\]/, h: "[i for i in range(5)]", w: "Đây là cách tạo list cực nhanh trong Python." },
    { m: "Xóa dictionary d hoàn toàn", r: /d\.clear\s*\(\s*\)/, h: "d.clear()", w: "Lệnh này làm trống mọi thứ trong dict." },
    { m: "Đếm số lần 'A' xuất hiện trong list a", r: /a\.count\s*\(\s*['\"]A['\"]\s*\)/, h: "a.count('A')", w: "Sử dụng hàm .count()." },
    { m: "Chèn 'X' vào vị trí số 1 của list a", r: /a\.insert\s*\(\s*1\s*,\s*['\"]X['\"]\s*\)/, h: "a.insert(1, 'X')", w: "Dùng .insert(vị_trí, giá_trị)." },
    { m: "Chuyển list a thành set", r: /set\s*\(\s*a\s*\)/, h: "set(a)", w: "Ép kiểu sang set sẽ loại bỏ các phần tử trùng." },
    { m: "Chuyển tuple t thành list", r: /list\s*\(\s*t\s*\)/, h: "list(t)", w: "Dùng hàm list() để chuyển đổi." },
    { m: "Câu lệnh pass (không làm gì cả)", r: /\bpass\b/, h: "pass", w: "Dùng pass khi bạn muốn để trống một khối lệnh." }
];

// Fallback Module 3: OOP, Exception, File I/O, Comprehension, Lambda/map/filter
const questionBank3 = [
    { q: "Từ khóa nào dùng để định nghĩa một lớp (class) trong Python?", opts: ["object", "class", "struct", "type"], ans: 1 },
    { q: "Phương thức nào tự động được gọi khi tạo đối tượng mới từ lớp?", opts: ["__start__()", "__new__()", "__init__()", "__create__()"], ans: 2 },
    { q: "Tham số đầu tiên của phương thức trong lớp thường đặt tên là gì?", opts: ["this", "self", "me", "cls"], ans: 1 },
    { q: "Hàm super() trong Python dùng để làm gì?", opts: ["Tạo đối tượng cấp cao hơn", "Gọi phương thức từ lớp cha", "Kiểm tra kiểu dữ liệu", "Xóa đối tượng"], ans: 1 },
    { q: "Khối lệnh nào luôn được thực thi dù có lỗi hay không trong try/except?", opts: ["try", "except", "else", "finally"], ans: 3 },
    { q: "Ngoại lệ nào xảy ra khi chia một số cho 0?", opts: ["ValueError", "TypeError", "ZeroDivisionError", "ArithmeticError"], ans: 2 },
    { q: "Ngoại lệ nào xảy ra khi truy cập key không tồn tại trong dictionary?", opts: ["IndexError", "KeyError", "AttributeError", "LookupError"], ans: 1 },
    { q: "Chế độ nào dùng để mở file chỉ đọc?", opts: ["'w'", "'r'", "'a'", "'rb'"], ans: 1 },
    { q: "Hàm lambda x: x * 2 là loại hàm gì?", opts: ["Hàm đệ quy", "Hàm ẩn danh (anonymous)", "Hàm bất đồng bộ", "Hàm tĩnh"], ans: 1 },
    { q: "Kết quả của list(map(str, [1, 2, 3])) là gì?", opts: ["[1, 2, 3]", "['1', '2', '3']", "123", "Lỗi"], ans: 1 },
];

// Fallback Module 4: Thuật toán Nâng cao (Đệ quy, DP, Sắp xếp, Đồ thị)
const questionBank4 = [
    { q: "Điều kiện nào bắt buộc phải có trong hàm đệ quy để tránh Stack Overflow?", opts: ["Vòng lặp for", "Điều kiện dừng (base case)", "Câu lệnh return None", "Ít nhất 2 lần gọi đệ quy"], ans: 1 },
    { q: "Độ phức tạp thời gian của Bubble Sort trong trường hợp xấu nhất là bao nhiêu?", opts: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"], ans: 2 },
    { q: "Thuật toán sắp xếp nào hoạt động theo nguyên lý 'chia để trị'?", opts: ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort"], ans: 3 },
    { q: "Độ phức tạp thời gian trung bình của Merge Sort là bao nhiêu?", opts: ["O(n^2)", "O(n)", "O(n log n)", "O(log n)"], ans: 2 },
    { q: "Binary Search yêu cầu mảng đầu vào phải như thế nào?", opts: ["Chứa số nguyên", "Đã được sắp xếp", "Có số lượng là lũy thừa 2", "Không có trùng lặp"], ans: 1 },
    { q: "Độ phức tạp thời gian của Binary Search là bao nhiêu?", opts: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], ans: 2 },
    { q: "Kỹ thuật Memoization dùng để làm gì?", opts: ["Lưu kết quả đã tính để tránh tính lại", "Ghi log đệ quy", "Giới hạn độ sâu đệ quy", "Chuyển đệ quy thành vòng lặp"], ans: 0 },
    { q: "Độ phức tạp của Fibonacci đệ quy thuần túy là bao nhiêu?", opts: ["O(n)", "O(log n)", "O(2^n)", "O(n^2)"], ans: 2 },
    { q: "BFS sử dụng cấu trúc dữ liệu nào?", opts: ["Stack", "Queue", "Heap", "Set"], ans: 1 },
    { q: "DFS thường dùng kỹ thuật nào?", opts: ["Queue", "Đệ quy hoặc Stack", "Heap", "Dictionary"], ans: 1 },
    { q: "Two Sum với O(n) dùng cấu trúc dữ liệu nào?", opts: ["Sắp xếp O(n log n)", "Dictionary/Hash Map O(n)", "Hai vòng lặp O(n^2)", "Binary Search O(n log n)"], ans: 1 },
    { q: "Bài toán Knapsack 0/1 là ví dụ điển hình của kỹ thuật nào?", opts: ["Tham lam (Greedy)", "Chia để trị", "Quy hoạch động (DP)", "Tìm kiếm nhị phân"], ans: 2 },
    { q: "Kiểm tra chuỗi ngoặc hợp lệ thường dùng cấu trúc nào?", opts: ["Queue", "Stack", "Set", "Dictionary"], ans: 1 },
    { q: "Fibonacci với memoization giảm độ phức tạp xuống còn bao nhiêu?", opts: ["O(2^n)", "O(n^2)", "O(n)", "O(log n)"], ans: 2 },
    { m: "Điều kiện dừng đệ quy Fibonacci khi n <= 1", r: /if\s+n\s*<=\s*1\s*:\s*return\s+n/, h: "if n <= 1: return n", w: "Điều kiện dừng: fib(0) = 0 và fib(1) = 1." },
    { m: "Tính mid trong Binary Search từ left và right", r: /mid\s*=\s*\(\s*left\s*\+\s*right\s*\)\s*\/\/\s*2/, h: "mid = (left + right) // 2", w: "Chia đôi bằng phép chia lấy phần nguyên." },
    { m: "Hoán đổi a[j] và a[j+1] trong Bubble Sort", r: /a\s*\[\s*j\s*\]\s*,\s*a\s*\[\s*j\s*\+\s*1\s*\]\s*=\s*a\s*\[\s*j\s*\+\s*1\s*\]\s*,\s*a\s*\[\s*j\s*\]/, h: "a[j], a[j+1] = a[j+1], a[j]", w: "Dùng phép gán đồng thời để hoán đổi." },
    { m: "Two Sum: tính complement = target - x", r: /complement\s*=\s*target\s*-\s*\w+/, h: "complement = target - x", w: "Với mỗi x, kiểm tra (target - x) đã có trong hashmap chưa." },
    { m: "Cập nhật a, b theo Fibonacci: a, b = b, a + b", r: /a\s*,\s*b\s*=\s*b\s*,\s*a\s*\+\s*b/, h: "a, b = b, a + b", w: "Cập nhật đồng thời a và b theo công thức Fibonacci." },
];



let selectedModule = 1;
let activeQuestions = [];
const directions = ["Góc Trái", "Chính Giữa", "Góc Phải"];
let gameStarted = false;
let currentQuestion = 0;
let score = 0;
let lives = 3;
let shooting = false;
let helps = { call: false, wise: false };
let playerName = "L";
let playerNumber = "22";
let consecutiveCorrect = 0;
let isPowerShot = false;

const characterConfigs = [
    { name: "CR7", skin: "#c8a07a", hair: "#1a1a1a", hairStyle: 'fade', browType: 'thick', facialHair: null, faceImg: "img/face_ronaldo.png" },
    { name: "Messi", skin: "#d4a574", hair: "#2c2c2c", hairStyle: 'classic', browType: 'normal', facialHair: 'beard', faceImg: "img/face_messi.png" },
    { name: "Neymar", skin: "#c89668", hair: "#e8b958", hairStyle: 'neymar-fauxhawk', browType: 'stylish', facialHair: 'neymar-beard', special: 'neymar-earring', faceImg: "img/face_neymar2.png" },
    { name: "Mbappe", skin: "#5c3317", hair: "#111", hairStyle: 'buzz', browType: 'normal', facialHair: null, faceImg: "img/face_mbappe.png" },
    { name: "Yamal", skin: "#8d5524", hair: "#1a1a1a", hairStyle: 'curly', browType: 'normal', facialHair: null, faceImg: "img/face_yamal.png" },
    { name: "Lukaku", skin: "#3c2415", hair: "#111", hairStyle: 'shaved-fade', browType: 'thick', facialHair: 'lukaku-beard', faceImg: "img/lukaku.jpg" },
    { name: "Van Dijk", skin: "#9e704e", hair: "#140e0a", hairStyle: 'vvd-bun', browType: 'sharp', facialHair: 'vvd-goatee', faceImg: "img/vvd.jpg" },
    { name: "IShowSpeed", skin: "#4a2f1d", hair: "#111", hairStyle: 'speed-afro', browType: 'expressive', facialHair: 'stubble', special: 'speed-eyes', faceImg: "img/speed.jpg" },
    { name: "Xuân Son", skin: "#b38258", hair: "#1a1a1a", hairStyle: 'curly-short', browType: 'thick', facialHair: 'xuan-son-beard', faceImg: "img/xuanson.png" },
    { name: "DO MIXI", skin: "#d4a574", hair: "#111", hairStyle: 'pompadour', browType: null, facialHair: 'mixi-style', special: 'mole', faceImg: "img/face_mixi2.jpg" }
];

// Preload face images for canvas drawing
const faceImages = {};
characterConfigs.forEach(cfg => {
    if (cfg.faceImg && cfg.faceImg.trim() !== '') {
        const img = new Image();
        img.src = cfg.faceImg;
        faceImages[cfg.faceImg] = img;
    }
});
let characterIndex = 0;
let selectedShirtColor = '#DA291C'; // Default: Man United red

// Club data: màu áo truyền thống & tên hiển thị
const clubData = {
    mu: { name: 'MAN UTD', shirt: '#DA291C', number: '7', accent: '#FFE500', logo: 'img/mu.webp' },
    chelsea: { name: 'CHELSEA', shirt: '#034694', number: '10', accent: '#ADBBCC', logo: 'img/chelsea.webp' },
    liverpool: { name: 'LIVERPOOL', shirt: '#C8102E', number: '9', accent: '#F6EB61', logo: 'img/liver.webp' },
    mancity: { name: 'MAN CITY', shirt: '#6CABDD', number: '17', accent: '#1C2C5B', logo: '' },
    real: { name: 'REAL', shirt: '#ffffff', number: '7', accent: '#FEBE10', logo: 'img/real.webp' },
    barca: { name: 'BARCA', shirt: '#004D98', number: '10', accent: '#EDBB00', logo: 'img/barca.webp' },
    haiphong: { name: 'HẢI PHÒNG', shirt: '#DA251D', number: '9', accent: '#FFFFFF', logo: '' },
    juventus: { name: 'JUVENTUS', shirt: '#1e1e1e', number: '10', accent: '#c6a84d', logo: 'img/juve.png' },
    bayern: { name: 'BAYERN', shirt: '#DC052D', number: '25', accent: '#0066B2', logo: 'img/bayern.png' },
    arsenal: { name: 'ARSENAL', shirt: '#EF0107', number: '14', accent: '#ffffff', logo: 'img/arsenal.png' }
};
let selectedClubId = 'mu';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const cw = canvas.width;
const ch = canvas.height;

const goalPos = { x: cw / 2, y: 100, w: 320, h: 180 };
const ballStart = { x: cw / 2, y: ch - 60, scale: 1 };
let ball = { ...ballStart, rotation: 0 };
let goalie = {
    x: cw / 2, y: 90, rotation: 0, state: 'idle',
    shirt: '#f1c40f', skin: '#4e342e', hair: '#111',
    name: 'ONANA', number: '24', hairStyle: 'buzz', browType: 'normal', facialHair: null,
    trail: []
};
let player = {
    x: cw / 2 - 40, y: ch - 60, state: 'idle', thought: null,
    shirt: '#e74c3c', skin: '#f3c19d', hair: '#d35400',
    name: 'NIÊN BÉO', number: '10', hairStyle: 0
};

function drawField() {
    // Pitch
    const grad = ctx.createLinearGradient(0, ch, 0, 150);
    grad.addColorStop(0, '#1e8449');
    grad.addColorStop(1, '#2ecc71');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cw, ch);

    // Markings
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(cw / 2, ballStart.y, 80, Math.PI, 0); ctx.stroke();
    // Penalty area
    ctx.strokeRect(cw / 2 - 220, 50, 440, 160);

    // Net
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= goalPos.w; i += 20) {
        ctx.moveTo(goalPos.x - goalPos.w / 2 + i, goalPos.y - goalPos.h / 2);
        ctx.lineTo(goalPos.x - goalPos.w / 2 + i, goalPos.y + goalPos.h / 2);
    }
    for (let i = 0; i <= goalPos.h; i += 20) {
        ctx.moveTo(goalPos.x - goalPos.w / 2, goalPos.y - goalPos.h / 2 + i);
        ctx.lineTo(goalPos.x + goalPos.w / 2, goalPos.y - goalPos.h / 2 + i);
    }
    ctx.stroke();

    // Posts
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 10;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeRect(goalPos.x - goalPos.w / 2, goalPos.y - goalPos.h / 2, goalPos.w, goalPos.h);

    // Scoreboard on field
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.roundRect(10, 10, 125, 100, 12); // Tăng chiều cao để hiện PowerShot
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '700 13px Outfit';
    ctx.fillText("LƯỢT: " + (currentQuestion + 1) + "/10", 20, 30);
    ctx.fillStyle = '#f1c40f';
    ctx.fillText("BÀN: " + score, 20, 48);
    ctx.fillStyle = '#e74c3c';
    let hearts = "";
    for (let i = 0; i < 3; i++) {
        hearts += (i < lives) ? "❤️" : "🖤";
    }
    ctx.fillText("TIM: " + hearts, 20, 66);

    // Power Shot indicator
    ctx.fillStyle = '#fff';
    ctx.font = '700 11px Outfit';
    ctx.fillText("POWERSHOT: ", 20, 85);
    for (let i = 0; i < 3; i++) {
        ctx.fillStyle = i < consecutiveCorrect ? '#ff4500' : '#444';
        ctx.beginPath();
        ctx.arc(95 + i * 12, 81, 4, 0, Math.PI * 2);
        ctx.fill();
        if (i < consecutiveCorrect) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff4500';
            ctx.stroke();
            ctx.shadowBlur = 0;
        }
    }
    if (isPowerShot) {
        ctx.fillStyle = '#ff4500';
        ctx.font = '900 12px Outfit';
        ctx.fillText("🔥 SẴN SÀNG!", 20, 102);
    }
    ctx.restore();
}

function drawChibi(char, rotation = 0, scale = 1, isTrail = false) {
    const { x, y, shirt, skin, name, number, state } = char;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(rotation);

    if (isTrail) {
        ctx.globalAlpha = 0.3;
    }

    const sc = skin;
    const isGoalie = (name || "").toUpperCase() === 'ONANA';
    const isMbappe = (name || "").toUpperCase().includes("MBAPPE");
    const isMixi = (name || "").toUpperCase().includes("MIXI");

    function hexDarken(hex, factor) {
        let c = (hex || '#888888').replace('#', '');
        if (c.length === 3) c = c.split('').map(ch => ch + ch).join('');
        return `rgb(${Math.max(0, Math.round(parseInt(c.slice(0, 2), 16) * factor))},${Math.max(0, Math.round(parseInt(c.slice(2, 4), 16) * factor))},${Math.max(0, Math.round(parseInt(c.slice(4, 6), 16) * factor))})`;
    }
    function getContrastColor(hex) {
        const c = (hex || '#888888').replace('#', '');
        const r = parseInt(c.slice(0, 2), 16), g = parseInt(c.slice(2, 4), 16), b = parseInt(c.slice(4, 6), 16);
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? '#1a1a2e' : '#ffffff';
    }
    const shortsColor = hexDarken(shirt, 0.55);

    // --- Shadow ---
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath(); ctx.ellipse(0, 48, 19, 7, 0, 0, Math.PI * 2); ctx.fill();

    // --- Cleats ---
    ctx.fillStyle = '#1c1c1c';
    if (state === 'kicking') {
        ctx.beginPath(); ctx.ellipse(-8, 57, 9, 4, 0, 0, Math.PI * 2); ctx.fill();
        ctx.save(); ctx.translate(8, 44); ctx.rotate(0.55);
        ctx.beginPath(); ctx.ellipse(4, 14, 9, 4, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    } else if (state === 'diving') {
        ctx.beginPath(); ctx.ellipse(-10, 55, 9, 4, -0.25, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(10, 55, 9, 4, 0.25, 0, Math.PI * 2); ctx.fill();
    } else {
        ctx.beginPath(); ctx.ellipse(-8, 57, 9, 4, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(8, 57, 9, 4, 0, 0, Math.PI * 2); ctx.fill();
    }

    // --- Socks ---
    ctx.fillStyle = '#f5f5f5';
    const rr = (rx, ry, rw, rh, rd = 3) => { ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(rx, ry, rw, rh, rd); else ctx.rect(rx, ry, rw, rh); ctx.fill(); };
    if (state === 'kicking') {
        rr(-12, 41, 8, 17); ctx.save(); ctx.translate(8, 35); ctx.rotate(0.55); rr(0, 0, 8, 17); ctx.restore();
    } else if (state === 'diving') {
        rr(-13, 39, 8, 17); rr(5, 39, 8, 17);
    } else if (state === 'running') {
        const b = Math.sin(Date.now() / 55) * 7;
        rr(-12 + b * 0.4, 41, 8, 17); rr(4 - b * 0.4, 41 - Math.abs(b) * 0.3, 8, 17);
    } else {
        rr(-12, 41, 8, 17); rr(4, 41, 8, 17);
    }

    // --- Thighs (skin) ---
    ctx.fillStyle = sc;
    if (state === 'kicking') {
        rr(-12, 28, 8, 15); ctx.save(); ctx.translate(8, 24); ctx.rotate(0.55); rr(0, 0, 8, 15); ctx.restore();
    } else if (state === 'running') {
        const b = Math.sin(Date.now() / 55) * 7;
        rr(-12 + b * 0.5, 28, 8, 15); rr(4 - b * 0.5, 28 - Math.abs(b) * 0.4, 8, 15);
    } else {
        rr(-12, 28, 8, 15); rr(4, 28, 8, 15);
    }

    // --- Shorts ---
    ctx.fillStyle = shortsColor;
    ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(-13, 22, 26, 10, [0, 0, 6, 6]); else ctx.rect(-13, 22, 26, 10); ctx.fill();
    // Tiny number on shorts
    ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = '700 6px Outfit'; ctx.fillText(number || "", 6, 29);
    // Shorts seam
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, 22); ctx.lineTo(0, 32); ctx.stroke();

    // --- Shirt ---
    ctx.fillStyle = shirt;
    ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(-13, -5, 26, 29, [7, 7, 0, 0]); else ctx.rect(-13, -5, 26, 29); ctx.fill();
    // V-collar
    ctx.fillStyle = hexDarken(shirt, 0.72);
    ctx.beginPath(); ctx.moveTo(-6, -5); ctx.lineTo(0, 3); ctx.lineTo(6, -5); ctx.closePath(); ctx.fill();

    // --- Arms ---
    ctx.strokeStyle = sc; ctx.lineWidth = 7; ctx.lineCap = 'round';
    if (isGoalie) {
        if (state === 'diving' || state === 'superman') {
            // Superman pose: arms extended forward (start from shoulders y=2)
            ctx.beginPath();
            ctx.moveTo(-11, 2); ctx.lineTo(-42, -18);
            ctx.moveTo(11, 2); ctx.lineTo(42, -18);
            ctx.stroke();
            // Optional: Gloves
            ctx.fillStyle = '#fff';
            rr(-48, -25, 12, 12, 4); rr(36, -25, 12, 12, 4);

            // Draw sleeves on the raised arms
            ctx.fillStyle = shirt;
            ctx.save();
            ctx.translate(-11, 2); ctx.rotate(Math.atan2(-20, -31));
            rr(0, -4, 15, 8, 3);
            ctx.restore();
            ctx.save();
            ctx.translate(11, 2); ctx.rotate(Math.atan2(-20, 31));
            rr(0, -4, 15, 8, 3);
            ctx.restore();
        } else if (state === 'catching') {
            ctx.beginPath(); ctx.moveTo(-13, 9); ctx.lineTo(-22, -9); ctx.moveTo(13, 9); ctx.lineTo(22, -9); ctx.stroke();
            // Normal sleeves
            ctx.fillStyle = shirt; rr(-20, 4, 8, 10, 4); rr(12, 4, 8, 10, 4);
        } else {
            ctx.beginPath(); ctx.moveTo(-13, 8); ctx.lineTo(-25, 22); ctx.moveTo(13, 8); ctx.lineTo(25, 22); ctx.stroke();
            // Normal sleeves
            ctx.fillStyle = shirt; rr(-20, 4, 8, 10, 4); rr(12, 4, 8, 10, 4);
        }
    } else {
        ctx.beginPath();
        if (state === 'running') {
            const sw = Math.sin(Date.now() / 55) * 10;
            ctx.moveTo(-13, 7); ctx.lineTo(-21 + sw, 24); ctx.moveTo(13, 7); ctx.lineTo(21 - sw, 24);
        } else if (state === 'kicking') {
            ctx.moveTo(-13, 7); ctx.lineTo(-23, 20); ctx.moveTo(13, 7); ctx.lineTo(25, 12);
        } else {
            ctx.moveTo(-13, 7); ctx.lineTo(-21, 24); ctx.moveTo(13, 7); ctx.lineTo(21, 24);
        }
        ctx.stroke();
        // Sleeves for player
        ctx.fillStyle = shirt;
        const sy = (state === 'kicking') ? 2 : 4;
        rr(-20, sy, 8, 10, 4); rr(12, sy, 8, 10, 4);
    }

    // --- Neck ---
    ctx.fillStyle = sc;
    ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(-5, -14, 10, 12, 3); else ctx.rect(-5, -14, 10, 12); ctx.fill();

    // --- HEAD & FACE DRAWING ---
    const hs = char.hairStyle || 'classic';
    const bt = char.browType || 'normal';
    const fh = char.facialHair || null;

    // 1. Hair Back/Base
    ctx.fillStyle = char.hair || '#111';
    ctx.beginPath();
    if (hs === 'neymar-fauxhawk' || hs === 'mohawk') {
        // Neymar: Dark tapered sides with high textured platinum-gold fauxhawk
        ctx.fillStyle = '#1c140e';
        ctx.arc(0, -18, 24, Math.PI, 0);
        ctx.fill();
        ctx.fillRect(-24, -20, 48, 6);

        // Golden highlighted textured fauxhawk
        ctx.fillStyle = '#e8b958';
        ctx.beginPath();
        ctx.ellipse(0, -29, 11, 20, 0, 0, Math.PI * 2);
        ctx.fill();

        // Layered curls along ridge
        const mohawkTufts = [
            [-8, -34, 4.5], [-4, -40, 5], [0, -44, 5.5], [4, -40, 5], [8, -34, 4.5],
            [-6, -26, 4], [6, -26, 4], [0, -32, 5]
        ];
        mohawkTufts.forEach(([tx, ty, tr]) => {
            ctx.beginPath();
            ctx.arc(tx, ty, tr, 0, Math.PI * 2);
            ctx.fill();
        });

        // Blonde highlight tips
        ctx.fillStyle = '#fbe38e';
        [[-2, -45, 2.5], [2, -43, 2.5], [0, -37, 2.8], [-4, -30, 2.2]].forEach(([hx, hy, hr]) => {
            ctx.beginPath();
            ctx.arc(hx, hy, hr, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.fillStyle = char.hair || '#111';
    } else if (hs === 'buzz') {
        ctx.arc(0, -18, 24, Math.PI, 0);
    } else if (hs === 'shaved-fade') {
        // Clean shaved cut for Lukaku
        ctx.arc(0, -17, 23.5, Math.PI, 0);
        ctx.fillRect(-24, -18, 48, 4);
    } else if (hs === 'vvd-bun' || hs === 'topknot') {
        // Virgil van Dijk: Sleek swept-back hair with elegant man-bun
        ctx.fillStyle = '#140e0a';
        ctx.arc(0, -21, 25.5, Math.PI, 0);
        ctx.fill();
        ctx.fillRect(-24, -21, 48, 7);

        // Swept-back flowing hair texture lines
        ctx.strokeStyle = '#281c15';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-16, -20); ctx.quadraticCurveTo(-10, -27, 0, -30);
        ctx.moveTo(16, -20); ctx.quadraticCurveTo(10, -27, 0, -30);
        ctx.moveTo(-8, -20); ctx.quadraticCurveTo(-4, -29, 0, -32);
        ctx.moveTo(8, -20); ctx.quadraticCurveTo(4, -29, 0, -32);
        ctx.stroke();

        // Sleek Man-Bun / Samurai topknot tied at crown
        ctx.fillStyle = '#140e0a';
        ctx.beginPath();
        ctx.ellipse(0, -34, 8, 7.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Hair band tie (gold accent)
        ctx.fillStyle = '#d4ac0d';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(-4.5, -28, 9, 3.2, 1.5); else ctx.fillRect(-4.5, -28, 9, 3.2);
        ctx.fill();

        // Bun detail ring
        ctx.strokeStyle = '#3a271c';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(0, -34, 5.5, -0.8, 1.2);
        ctx.stroke();

        ctx.fillStyle = char.hair || '#111';
    } else if (hs === 'speed-afro') {
        // IShowSpeed wild bushy textured messy afro
        ctx.fillStyle = char.hair || '#111';

        // Main high-volume afro dome (much taller and wider)
        ctx.beginPath();
        ctx.ellipse(0, -27, 28, 22, 0, Math.PI, 0);
        ctx.fill();

        // Base side volume
        ctx.fillRect(-26, -26, 52, 13);

        // Multi-layered wild messy afro puffs / clumps (outer ring)
        const outerPuffs = [
            { x: -28, y: -20, r: 8 }, { x: -30, y: -29, r: 9 }, { x: -26, y: -38, r: 9.5 },
            { x: -17, y: -45, r: 10 }, { x: -6, y: -49, r: 10.5 }, { x: 6, y: -49, r: 10.5 },
            { x: 17, y: -45, r: 10 }, { x: 26, y: -38, r: 9.5 }, { x: 30, y: -29, r: 9 },
            { x: 28, y: -20, r: 8 }
        ];
        outerPuffs.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });

        // Wild frizzy spikes/tufts sticking out in all directions
        const wildSpikes = [
            [-25, -42, -33, -54],
            [-14, -48, -20, -62],
            [-4, -50, -6, -65],
            [6, -50, 9, -64],
            [17, -47, 24, -60],
            [27, -40, 36, -52],
            [-30, -31, -40, -36],
            [30, -31, 40, -35],
            [-27, -22, -37, -22],
            [27, -22, 37, -22]
        ];
        ctx.strokeStyle = char.hair || '#111';
        ctx.lineWidth = 4.5;
        ctx.lineCap = 'round';
        wildSpikes.forEach(([x1, y1, x2, y2]) => {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        });
        // Extra mini curly tufts on spike tips for wild bushy texture
        wildSpikes.forEach(([, , x2, y2]) => {
            ctx.beginPath();
            ctx.arc(x2, y2, 3.8, 0, Math.PI * 2);
            ctx.fill();
        });
    } else if (hs === 'curly-short') {
        // Xuân Son short textured athletic curly hair
        ctx.beginPath();
        ctx.arc(0, -20, 24.5, Math.PI, 0);
        ctx.fill();
        for (let a = 0; a <= Math.PI; a += 0.45) {
            ctx.beginPath();
            ctx.arc(Math.cos(a + Math.PI) * 23.5, Math.sin(a + Math.PI) * 23.5 - 17, 4.5, 0, Math.PI * 2);
            ctx.fill();
        }
    } else if (hs === 'curly') {
        for (let a = 0; a < Math.PI; a += 0.4) {
            ctx.arc(Math.cos(a + Math.PI) * 24, Math.sin(a + Math.PI) * 24 - 18, 6, 0, Math.PI * 2);
        }
    } else if (hs === 'fade') {
        ctx.arc(0, -21, 25, Math.PI, 0);
        ctx.fillRect(-25, -21, 50, 5);
    } else if (hs === 'pompadour') {
        // High volume hair for Mixi
        ctx.beginPath();
        ctx.ellipse(0, -26, 26, 18, 0, Math.PI, 0); // Top volume
        ctx.fill();
        ctx.fillRect(-24, -22, 48, 8); // Sides
    } else {
        ctx.arc(0, -22, 26, Math.PI, 0);
    }
    ctx.fill();

    // 2. Face Shape
    ctx.fillStyle = sc;
    ctx.beginPath();
    ctx.arc(0, -16, 23, 0, Math.PI * 2);
    ctx.fill();

    // 3. Facial Hair (Beard/Mustache) - Properly placed, refined & aesthetic
    if (fh) {
        ctx.fillStyle = hexDarken(char.hair || '#111', 0.85);
        if (fh === 'beard') {
            // Messi: Natural warm trimmed beard hugging jawline & clean slim mustache
            ctx.globalAlpha = 0.55;
            ctx.beginPath();
            ctx.arc(0, -16, 23.2, 0.45, Math.PI - 0.45);
            ctx.lineTo(0, -2);
            ctx.fill();
            ctx.fillRect(-7, -13, 14, 1.4); // Slim mustache above lip
        } else if (fh === 'neymar-beard') {
            // Neymar: Stylish micro-pencil mustache + soul patch + tiny chin goatee
            ctx.fillStyle = '#1c140e';
            ctx.globalAlpha = 0.85;
            ctx.fillRect(-6.5, -13, 13, 1.3); // Neat pencil mustache
            ctx.fillRect(-1, -7, 2, 2); // Soul patch
            ctx.beginPath();
            ctx.ellipse(0, 1.5, 3.2, 3.5, 0, 0, Math.PI * 2); // Chin goatee
            ctx.fill();
            ctx.globalAlpha = 0.25;
            ctx.beginPath();
            ctx.arc(0, -16, 23.2, 0.5, Math.PI - 0.5);
            ctx.lineTo(0, 0);
            ctx.fill();
        } else if (fh === 'lukaku-beard') {
            // Lukaku: Clean dark masculine beard along jawline, slim mustache, neat chin
            ctx.fillStyle = '#111';
            ctx.globalAlpha = 0.75;
            ctx.beginPath();
            ctx.arc(0, -16, 23.4, 0.35, Math.PI - 0.35);
            ctx.lineTo(0, -2);
            ctx.fill();
            ctx.fillRect(-8, -13.2, 16, 1.5); // Mustache
            ctx.fillRect(-1.5, -7, 3, 2.2); // Soul patch
        } else if (fh === 'vvd-goatee') {
            // Virgil van Dijk: Sleek sculpted mustache & elegant diamond chin goatee
            ctx.fillStyle = '#140e0a';
            ctx.globalAlpha = 0.85;
            ctx.beginPath();
            ctx.moveTo(-8, -13); ctx.quadraticCurveTo(0, -14, 8, -13);
            ctx.lineWidth = 1.4; ctx.strokeStyle = '#140e0a'; ctx.stroke();
            // Delicate connecting lines
            ctx.beginPath();
            ctx.moveTo(-6, -12.5); ctx.lineTo(-3.5, -6.5);
            ctx.moveTo(6, -12.5); ctx.lineTo(3.5, -6.5);
            ctx.lineWidth = 1.1; ctx.strokeStyle = '#140e0a'; ctx.stroke();
            // Soul patch
            ctx.fillRect(-1.2, -7, 2.4, 2);
            // Sharp chin goatee
            ctx.beginPath();
            ctx.ellipse(0, 1.8, 3.8, 4.2, 0, 0, Math.PI * 2);
            ctx.fill();
        } else if (fh === 'xuan-son-beard') {
            // Xuân Son: Short athletic beard along jaw & slim mustache
            ctx.globalAlpha = 0.65;
            ctx.beginPath();
            ctx.arc(0, -16, 23.2, 0.45, Math.PI - 0.45);
            ctx.lineTo(0, -2);
            ctx.fill();
            ctx.fillRect(-7, -13, 14, 1.3);
            ctx.fillRect(-1, -7, 2, 2);
        } else if (fh === 'stubble') {
            // Light chin stubble shadow
            ctx.globalAlpha = 0.25;
            ctx.beginPath(); ctx.arc(0, -16, 23, 0.55, Math.PI - 0.55); ctx.lineTo(0, 0); ctx.fill();
        } else if (fh === 'goatee') {
            // Neat slim goatee
            ctx.globalAlpha = 0.75;
            ctx.fillRect(-6, -13, 12, 1.3);
            ctx.fillRect(-1, -7, 2, 2);
            ctx.beginPath(); ctx.ellipse(0, 1.5, 3.2, 3.5, 0, 0, Math.PI * 2); ctx.fill();
        } else if (fh === 'mixi-style') {
            // Độ Mixi: Sharp thin mustache + small soul patch & chin goatee
            ctx.globalAlpha = 0.8;
            ctx.fillRect(-7, -13, 14, 1.3); // Mustache
            ctx.fillRect(-1.2, -7, 2.4, 2); // Soul patch
            ctx.beginPath(); ctx.arc(0, 2, 3.2, 0, Math.PI); ctx.fill(); // Chin goatee
        }
        ctx.globalAlpha = 1.0;
    }

    // 4. Eyes
    const isSpeed = char.special === 'speed-eyes';
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    const eyeRadius = isSpeed ? 5.5 : 4.5;
    ctx.arc(-8, -16, eyeRadius, 0, Math.PI * 2);
    ctx.arc(8, -16, eyeRadius, 0, Math.PI * 2);
    ctx.fill();

    // Pupils
    ctx.fillStyle = '#111';
    ctx.beginPath();
    let eyeFocusY = (state === 'kicking') ? -15 : -16;
    const pupilRadius = isSpeed ? 2.6 : 2.2;
    ctx.arc(-8, eyeFocusY, pupilRadius, 0, Math.PI * 2);
    ctx.arc(8, eyeFocusY, pupilRadius, 0, Math.PI * 2);
    ctx.fill();

    // 5. Eyebrows
    ctx.strokeStyle = hexDarken(char.hair || '#111', 0.5);
    ctx.lineWidth = (bt === 'thick') ? 2.8 : (bt === 'expressive' ? 2.6 : 1.8);
    ctx.beginPath();
    if (bt === 'thick') {
        ctx.moveTo(-14, -23); ctx.lineTo(-3, -21.5);
        ctx.moveTo(14, -23); ctx.lineTo(3, -21.5);
    } else if (bt === 'expressive') {
        // High energetic raised eyebrows for Speed
        ctx.moveTo(-14, -25); ctx.lineTo(-3, -22);
        ctx.moveTo(14, -25); ctx.lineTo(3, -22);
    } else if (bt === 'stylish') {
        // Neymar stylish curved groomed eyebrows
        ctx.lineWidth = 2.1;
        ctx.moveTo(-13, -22.5); ctx.quadraticCurveTo(-7, -25.5, -3, -23);
        ctx.moveTo(13, -22.5); ctx.quadraticCurveTo(7, -25.5, 3, -23);
    } else if (bt === 'sharp') {
        ctx.lineWidth = 2.4;
        ctx.moveTo(-14, -22.5); ctx.lineTo(-4, -24.5);
        ctx.moveTo(14, -22.5); ctx.lineTo(4, -24.5);
    } else {
        ctx.moveTo(-13, -22.5); ctx.quadraticCurveTo(-8, -25, -3, -22);
        ctx.moveTo(13, -22.5); ctx.quadraticCurveTo(8, -25, 3, -22);
    }
    ctx.stroke();

    // 6. Mouth - Cleanly visible and charming
    ctx.strokeStyle = 'rgba(0,0,0,0.6)';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    if (state === 'sad') {
        ctx.arc(0, -6, 4.5, Math.PI, 0);
    } else if (state === 'smile' || state === 'catching' || isSpeed) {
        ctx.arc(0, -9.5, 6, 0.15, Math.PI - 0.15);
    } else if (state === 'running') {
        ctx.arc(0, -9, 2.8, 0, Math.PI * 2);
    } else {
        ctx.arc(0, -9.5, 4.2, 0.35, Math.PI - 0.35);
    }
    ctx.stroke();

    // 7. Special Extras (Mole, Earring, etc.)
    if (char.special === 'mole') {
        ctx.fillStyle = '#111';
        ctx.beginPath(); ctx.arc(9, -10, 2, 0, Math.PI * 2); ctx.fill();
    }
    if (isSpeed) {
        // Messy textured front curls sticking out on forehead
        ctx.fillStyle = char.hair || '#111';
        const frontTufts = [
            [-16, -26, 4.5], [-9, -28, 5], [-1, -27, 5.2], [7, -28, 4.8], [15, -26, 4.5],
            [-5, -24, 2.5], [4, -24, 2.8]
        ];
        frontTufts.forEach(([cx, cy, cr]) => {
            ctx.beginPath();
            ctx.arc(cx, cy, cr, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    if (char.special === 'neymar-earring' || name === 'NEYMAR') { // Sparkling Diamond Earring
        ctx.fillStyle = '#d4ac0d';
        ctx.beginPath(); ctx.arc(23.5, -16, 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(23.5, -16, 1.3, 0, Math.PI * 2); ctx.fill();
    }

    // --- SHIRT TEXT ---
    ctx.fillStyle = isGoalie ? '#000' : getContrastColor(shirt);
    ctx.textAlign = 'center';
    const nl = (name || "").length > 6 ? 7 : 9;
    ctx.font = `800 ${nl}px Outfit`;
    ctx.fillText(name || "", 0, 12, 22);
    ctx.font = '800 17px Outfit';
    ctx.fillText(number || "10", 0, 28, 22);

    ctx.restore();
}

function drawBall() {
    ctx.save();
    ctx.translate(ball.x, ball.y);
    ctx.scale(ball.scale, ball.scale);
    ctx.rotate(ball.rotation);

    // Ball Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath(); ctx.ellipse(0, 18, 14, 6, 0, 0, Math.PI * 2); ctx.fill();

    // Fireball effect for Power Shot
    if (isPowerShot && ball.y < ballStart.y - 20) {
        const fireGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, 35);
        fireGrad.addColorStop(0, 'rgba(255, 165, 0, 0.8)');
        fireGrad.addColorStop(0.5, 'rgba(255, 69, 0, 0.4)');
        fireGrad.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = fireGrad;
        ctx.beginPath(); ctx.arc(0, 0, 35, 0, Math.PI * 2); ctx.fill();

        // Fire trails
        for (let i = 0; i < 8; i++) {
            ctx.fillStyle = `rgba(255, ${100 + Math.random() * 100}, 0, ${0.3 + Math.random() * 0.5})`;
            const angle = Math.random() * Math.PI * 2;
            const dist = 15 + Math.random() * 20;
            ctx.beginPath();
            ctx.arc(Math.cos(angle) * dist, Math.sin(angle) * dist + 10, 3 + Math.random() * 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // 3D Ball Base
    const ballGrad = ctx.createRadialGradient(-5, -5, 2, 0, 0, 15);
    ballGrad.addColorStop(0, '#fff');
    ballGrad.addColorStop(0.8, '#f0f0f0');
    ballGrad.addColorStop(1, '#bbb');
    ctx.fillStyle = ballGrad;
    ctx.beginPath(); ctx.arc(0, 0, 15, 0, Math.PI * 2); ctx.fill();

    // Realistic Hexagons
    ctx.fillStyle = '#222';
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ddd';
    for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        const hX = Math.cos(angle) * 8;
        const hY = Math.sin(angle) * 8;
        ctx.beginPath(); ctx.arc(hX, hY, 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Highlight
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.beginPath(); ctx.arc(-5, -5, 4, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
}

function drawThoughtBubble(x, y, text) {
    if (!text) return;
    ctx.save();

    // Set font first to measure correctly
    ctx.font = '700 13px Outfit';
    const textWidth = ctx.measureText(text).width;
    const bubbleWidth = textWidth + 40; // Add padding

    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 2;

    // Position bubble higher or further right depending on scale
    const bubbleX = x + 80;
    const bubbleY = y - 90;

    // Large Bubble
    ctx.beginPath();
    ctx.ellipse(bubbleX, bubbleY, bubbleWidth / 2, 35, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Small connector circles
    ctx.beginPath(); ctx.arc(x + 20, y - 55, 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(x + 10, y - 35, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText(text, bubbleX, bubbleY + 5);

    ctx.restore();
}

function render() {
    drawField();

    // Draw goalie trails
    if (goalie.trail && goalie.trail.length > 0) {
        goalie.trail.forEach((t, i) => {
            ctx.save();
            ctx.globalAlpha = (i + 1) / (goalie.trail.length + 1) * 0.4;
            drawChibi({ ...goalie, x: t.x, y: t.y, state: t.state }, t.rotation, 1.8 * t.scale, true);
            ctx.restore();
        });
    }

    drawChibi(goalie, goalie.rotation, 1.8);
    drawChibi(player, 0, 1.8);
    if (player.thought) {
        drawThoughtBubble(player.x - 40, player.y - 30, player.thought);
    }
    drawBall();
}

function animateShot(dir, isGoal, cb) {
    const targets = [
        { x: goalPos.x - 120, y: goalPos.y - 40 },
        { x: goalPos.x, y: goalPos.y - 20 },
        { x: goalPos.x + 120, y: goalPos.y - 40 }
    ];
    const target = targets[dir];
    let goalieDiveDir = !isGoal ? dir : (dir + (Math.random() < 0.5 ? 1 : 2)) % 3;
    const goalieTargets = [goalPos.x - 120, goalPos.x, goalPos.x + 120];
    const gTargetX = goalieTargets[goalieDiveDir];

    let runT = 0;
    const playerStartX = player.x;
    const playerTargetX = ball.x - 40;

    function runStep() {
        runT += 0.05;
        player.x = playerStartX + (playerTargetX - playerStartX) * runT;
        player.state = 'running';
        render();
        if (runT < 1) requestAnimationFrame(runStep);
        else {
            player.state = 'kicking';
            startBallShot();
        }
    }

    function startBallShot() {
        let t = 0;
        const isSuperman = Math.random() > 0.3 || isPowerShot;
        function step() {
            t += 0.022;
            const startX = ballStart.x, startY = ballStart.y;
            ball.x = startX + (target.x - startX) * t;
            ball.y = startY + (target.y - startY) * t - Math.sin(t * Math.PI) * 120;
            ball.scale = 1 - t * 0.45;
            ball.rotation += 0.4;
            if (t > 0.12) {
                goalie.state = !isGoal && t > 0.6 ? 'catching' : (isSuperman ? 'superman' : 'diving');

                // Track trail
                goalie.trail.push({ x: goalie.x, y: goalie.y, rotation: goalie.rotation, state: goalie.state, scale: 1 - (t * 0.1) });
                if (goalie.trail.length > 5) goalie.trail.shift();

                // Superman fly logic: move further and tilt more
                if (goalie.state === 'superman') {
                    goalie.x += (gTargetX - goalie.x) * 0.18;
                    goalie.y = 90 - Math.sin((t - 0.12) / (1 - 0.12) * Math.PI) * 60; // Bay cao hơn nữa

                    // Smooth rotation for superman
                    const rotTarget = (goalieDiveDir === 0) ? -Math.PI / 2 : (goalieDiveDir === 2 ? Math.PI / 2 : 0);
                    goalie.rotation += (rotTarget - goalie.rotation) * 0.2;
                } else {
                    goalie.x += (gTargetX - goalie.x) * 0.12;
                    if (goalieDiveDir === 0) goalie.rotation = -1.1 * (t - 0.12);
                    if (goalieDiveDir === 2) goalie.rotation = 1.1 * (t - 0.12);
                }

                if (!isGoal && t > 0.82) {
                    ball.x = goalie.x;
                    ball.y = goalie.y + 40;
                }
            }
            render();
            if (t < 1) requestAnimationFrame(step);
            else {
                player.state = 'idle';
                if (!isGoal) { goalie.state = 'smile'; ball.x = goalie.x; ball.y = goalie.y - 10; }
                else goalie.state = 'sad';
                goalie.y = 90; // Reset height
                goalie.trail = []; // Clear trail
                render(); cb();
            }
        }
        step();
    }
    runStep();
}

async function initGame() {
    try {
        const response = await fetch(`module_${selectedModule}.json`);
        const data = await response.json();

        const pickRandom = (arr, count) => [...arr].sort(() => Math.random() - 0.5).slice(0, count);
        const dedupeQuestions = (arr) => {
            const seen = new Set();
            return arr.filter((q) => {
                const key = `${q.type || ''}|${q.q || ''}|${q.m || ''}`;
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            });
        };

        const mcqs = (data.questions || []).map(q => ({ ...q, type: 'mcq' }));
        const codes = (data.coding_tasks || []).map(q => ({ ...q, type: 'code', m: q.q }));

        // Lấy toàn bộ câu hỏi từ JSON (module_1.json và module_2.json đã đủ câu)
        const allQuestions = dedupeQuestions([...mcqs, ...codes]);

        activeQuestions = pickRandom(allQuestions, 10);

        currentQuestion = 0;
        score = 0;
        lives = 3;
        consecutiveCorrect = 0;
        isPowerShot = false;
        helps = { call: false, wise: false, fifty: false };
        document.querySelectorAll('.lifeline-btn').forEach(b => b.classList.remove('used'));
        document.querySelectorAll('.lifeline-select').forEach(s => {
            s.classList.remove('used');
            s.disabled = false;
        });
        showQuestion();
    } catch (e) {
        console.error("Lỗi tải câu hỏi:", e);
        let bank;
        if (selectedModule === 1) bank = [...module1McqFallback, ...questionBank];
        else if (selectedModule === 2) bank = questionBank2;
        else if (selectedModule === 3) bank = questionBank3;
        else bank = questionBank4;

        const normalizedFallback = bank.map((q) => {
            if (q.type) return q;
            if (Array.isArray(q.opts) && typeof q.ans === 'number') {
                return { ...q, type: 'mcq' };
            }
            return { ...q, type: 'code' };
        });

        activeQuestions = normalizedFallback.sort(() => Math.random() - 0.5).slice(0, 10);
        showQuestion();
    }
}

function selectModule(num) {
    selectedModule = num;
    document.querySelectorAll('.module-card').forEach(c => c.classList.remove('active'));
    document.getElementById('mod' + num).classList.add('active');
}

function selectChar(idx) {
    if (idx < 0 || idx >= characterConfigs.length) idx = 0;
    characterIndex = idx;
    document.querySelectorAll('.char-card').forEach(c => c.classList.remove('active'));
    const el = document.getElementById('char' + idx);
    if (el) el.classList.add('active');
}

function selectClub(clubId, el) {
    if (!clubData[clubId]) clubId = 'mu';
    selectedClubId = clubId;
    selectedShirtColor = clubData[clubId].shirt;
    document.querySelectorAll('.club-card').forEach(c => c.classList.remove('active'));
    if (el) {
        el.classList.add('active');
    } else {
        const target = document.getElementById('club-' + clubId);
        if (target) target.classList.add('active');
    }
}

function validateNumberInput(el) {
    if (!el) return;
    let val = el.value.replace(/[^0-9]/g, '');
    if (val.length > 2) val = val.slice(0, 2);
    if (val !== '') {
        let num = parseInt(val, 10);
        if (num > 99) num = 99;
        val = num.toString();
    }
    el.value = val;
}

// === CẤU HÌNH HỆ THỐNG CHỐNG GIAN LẬN & ĐẾM NGƯỜI DÙNG ===
let questionTimerInterval = null;
let timeLeft = 30;
let isQuestionAnswered = false;
let antiCheatSetupDone = false;
let tabSwitchPenalized = false;

let focusPollInterval = null;

function setupAntiCheat() {
    if (antiCheatSetupDone) return;
    antiCheatSetupDone = true;

    // 1. Polling kiểm tra Focus liên tục (350ms)
    // Giúp bắt triệt để khi chia màn hình và click chuột sang ứng dụng/tab bên cạnh, hoặc mở Snipping Tool (Win+Shift+S)
    if (!focusPollInterval) {
        focusPollInterval = setInterval(() => {
            if (gameStarted && !shooting && !isQuestionAnswered && currentQuestion < 10 && lives > 0) {
                if (!document.hasFocus() || document.visibilityState === 'hidden') {
                    triggerTabSwitchPenalty("Nhấp chuột ra ngoài cửa sổ game / sang tab ứng dụng khác (chia màn hình / Snipping Tool)");
                }
            }
        }, 350);
    }

    // 2. Phát hiện chuyển Tab trình duyệt
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden' && gameStarted && !shooting && !isQuestionAnswered && currentQuestion < 10 && lives > 0) {
            triggerTabSwitchPenalty("Chuyển tab trình duyệt");
        }
    });

    // 4. Phát hiện mất Focus cửa sổ (Window Blur)
    window.addEventListener('blur', () => {
        if (gameStarted && !shooting && !isQuestionAnswered && currentQuestion < 10 && lives > 0) {
            triggerTabSwitchPenalty("Click ra ngoài cửa sổ game (chia màn hình / Snipping Tool / phần mềm khác)");
        }
    });

    // 5. Phát hiện Thu nhỏ / Chia màn hình theo kích thước khung hình (Resize Event)
    window.addEventListener('resize', () => {
        if (gameStarted && !shooting && !isQuestionAnswered && currentQuestion < 10 && lives > 0) {
            if (window.innerWidth < 700) {
                triggerTabSwitchPenalty("Thu nhỏ / Chia màn hình cửa sổ game (< 700px)");
            }
        }
    });

    // 6. Chặn Chuột phải (Context menu)
    document.addEventListener('contextmenu', (e) => {
        if (gameStarted && !shooting) {
            e.preventDefault();
            showAntiCheatNotice("⚠️ CHỐNG GIAN LẬN: Chuột phải bị vô hiệu hóa trong khi làm bài!");
        }
    });

    // 7. Chặn Copy / Cut
    document.addEventListener('copy', handleCopyCut);
    document.addEventListener('cut', handleCopyCut);

    // 8. Chặn Phím tắt & Bắt Phím Chụp màn hình (PrintScreen / Win+Shift+S / Cmd+Shift+4)
    document.addEventListener('keydown', handleKeyCombination);
    document.addEventListener('keyup', handleKeyUpAntiCheat);

    // 9. Chặn Dán (Paste) vào ô nhập code
    const answerInput = document.getElementById('answer');
    if (answerInput) {
        answerInput.addEventListener('paste', (e) => {
            e.preventDefault();
            showAntiCheatNotice("⚠️ CHỐNG GIAN LẬN: Không cho dán (paste)! Vui lòng tự gõ câu trả lời.");
        });
    }
}

function handleKeyUpAntiCheat(e) {
    if (!gameStarted || shooting || isQuestionAnswered) return;
    const isPrintScreen = e.key === 'PrintScreen' || e.code === 'PrintScreen';
    if (isPrintScreen) {
        triggerTabSwitchPenalty("Sử dụng phím chụp màn hình (PrintScreen)");
    }
}

function handleCopyCut(e) {
    if (gameStarted) {
        e.preventDefault();
        showAntiCheatNotice("⚠️ CHỐNG GIAN LẬN: Không cho phép sao chép nội dung câu hỏi!");
    }
}

function handleKeyCombination(e) {
    if (!gameStarted || shooting || isQuestionAnswered) return;
    const isCtrl = e.ctrlKey || e.metaKey;
    const isMeta = e.key === 'Meta' || e.key === 'OS';
    const key = e.key.toLowerCase();
    const isPrintScreen = e.key === 'PrintScreen' || e.code === 'PrintScreen';

    // Bắt phím PrintScreen hoặc Win+Shift+S (Snipping Tool)
    if (isPrintScreen || (isMeta && e.shiftKey && key === 's') || (e.shiftKey && key === 's' && isCtrl)) {
        e.preventDefault();
        triggerTabSwitchPenalty("Sử dụng công cụ chụp màn hình (Win + Shift + S / PrintScreen)");
        return;
    }

    // Chặn Ctrl+C, Ctrl+V, Ctrl+U, Ctrl+Shift+I, F12
    if (e.key === 'F12' || (isCtrl && (key === 'c' || key === 'v' || key === 'u' || key === 's')) || (isCtrl && e.shiftKey && (key === 'i' || key === 'c' || key === 'j'))) {
        e.preventDefault();
        showAntiCheatNotice("⚠️ CHỐNG GIAN LẬN: Thao tác phím tắt bị vô hiệu hóa!");
    }
}

function showAntiCheatNotice(msg) {
    const hintDiv = document.getElementById('hint');
    if (hintDiv) {
        hintDiv.style.color = '#e74c3c';
        hintDiv.style.fontWeight = '700';
        hintDiv.innerText = msg;
        setTimeout(() => {
            if (hintDiv.innerText === msg) hintDiv.innerText = '';
        }, 3000);
    }
}

let pendingPenaltyNextAction = null;

function showPenaltyModal(title, message, onAcknowledge) {
    stopQuestionTimer();

    const modal = document.getElementById('penaltyModal');
    const titleElem = document.getElementById('penaltyTitle');
    const msgElem = document.getElementById('penaltyMessage');

    if (titleElem) titleElem.innerText = title;
    if (msgElem) msgElem.innerHTML = message;

    pendingPenaltyNextAction = onAcknowledge;

    if (modal) modal.style.display = 'flex';
}

function acknowledgePenalty() {
    const modal = document.getElementById('penaltyModal');
    if (modal) modal.style.display = 'none';

    if (typeof pendingPenaltyNextAction === 'function') {
        const action = pendingPenaltyNextAction;
        pendingPenaltyNextAction = null;
        action();
    }
}

function triggerTabSwitchPenalty(reason) {
    if (!gameStarted || shooting || currentQuestion >= 10 || lives <= 0) return;
    if (isQuestionAnswered) return;

    if (tabSwitchPenalized) return;
    tabSwitchPenalized = true;
    setTimeout(() => { tabSwitchPenalized = false; }, 2500);

    stopQuestionTimer();

    const optsContainer = document.getElementById('optsContainer');
    const answerInput = document.getElementById('answer');
    const submitBtn = document.getElementById('submitBtn');
    const directionBox = document.getElementById('directionBox');
    if (optsContainer) optsContainer.style.display = 'none';
    if (answerInput) answerInput.style.display = 'none';
    if (submitBtn) submitBtn.style.display = 'none';
    if (directionBox) directionBox.style.display = 'none';

    const isDead = handleLifeLoss();

    const q = activeQuestions[currentQuestion];
    let correctSolutionHtml = '';
    if (q) {
        if (q.type === 'mcq') {
            correctSolutionHtml = `<div style="background: #e8f8f5; border-left: 4px solid #2ecc71; padding: 10px 14px; margin: 10px 0; text-align: left; border-radius: 8px; font-size: 0.95rem; color: #27ae60;">
                <b>✅ Đáp án đúng của câu này l\u00e0:</b> <span style="font-weight: 700;">${q.opts[q.ans]}</span>
            </div>`;
        } else {
            correctSolutionHtml = `<div style="background: #e8f8f5; border-left: 4px solid #2ecc71; padding: 10px 14px; margin: 10px 0; text-align: left; border-radius: 8px; font-size: 0.95rem; color: #2c3e50;">
                <b>\uD83D\uDCA1 G\u1ee3i \u00fd m\u1eabu code \u0111\u00fang:</b> <code style="background: #fff; padding: 3px 8px; border-radius: 4px; color: #c0392b; font-weight: 700; font-family: monospace;">${q.h}</code>
            </div>`;
        }
    }

    showPenaltyModal(
        "⚠️ TH\u00d4NG B\u00c1O B\u1eca TR\u1eea TIM (VI PH\u1EA0M GIAN L\u1EACN)",
        `<b>❌ L\u1ed7i vi ph\u1EA1m:</b> ${reason}.<br>B\u1EA1n b\u1ECB <b>tr\u1EEB 1 tim ❤️</b> v\u00e0 m\u1EA5t l\u01B0\u1EE3t s\u00fat n\u00e0y!
        <div style="background: #fef9e7; border-left: 4px solid #f39c12; padding: 10px 14px; margin: 10px 0; text-align: left; border-radius: 8px; font-size: 0.9rem; color: #7f8c8d;">
            <b>👉 Thao t\u00e1c \u0111\u00fang:</b> M\u1edf to\u00e0n m\u00e0n h\u00ecnh game, gi\u1eef con tr\u1ecf chu\u1ed9t t\u1EADp trung trong c\u1eeda s\u1ed5 v\u00e0 kh\u00f4ng nh\u1ea5p chu\u1ed9t/chuy\u1ec3n tab sang \u1ee9ng d\u1ee5ng kh\u00e1c hay d\u00f9ng ph\u00edm ch\u1ee5p m\u00e0n h\u00ecnh (Win+Shift+S).
        </div>
        ${correctSolutionHtml}`,
        () => {
            if (!isDead) {
                currentQuestion++;
                showQuestion();
            }
        }
    );
}

function startQuestionTimer() {
    stopQuestionTimer();

    const q = activeQuestions[currentQuestion];
    if (!q) return;

    const isCode = q.type === 'code';
    const isHardModule = selectedModule >= 3;

    // Thời gian suy nghĩ tùy độ khó:
    // Trắc nghiệm Module 1-2: 30 giây | Code Module 1-2: 45 giây
    // Trắc nghiệm Module 3-4: 40 giây | Code Module 3-4: 60 giây
    timeLeft = isCode ? (isHardModule ? 60 : 45) : (isHardModule ? 40 : 30);
    isQuestionAnswered = false;

    updateTimerUI();

    questionTimerInterval = setInterval(() => {
        timeLeft--;
        updateTimerUI();

        if (timeLeft <= 0) {
            stopQuestionTimer();
            handleTimeOut();
        }
    }, 1000);
}

function stopQuestionTimer() {
    if (questionTimerInterval) {
        clearInterval(questionTimerInterval);
        questionTimerInterval = null;
    }
}

function updateTimerUI() {
    const secondsSpan = document.getElementById('timerSeconds');
    const timerBadge = document.getElementById('timerBadge');

    if (secondsSpan) secondsSpan.innerText = timeLeft;

    if (timerBadge) {
        timerBadge.classList.remove('warning', 'danger');
        if (timeLeft <= 10) {
            timerBadge.classList.add('danger');
        } else if (timeLeft <= 15) {
            timerBadge.classList.add('warning');
        }
    }
}

function handleTimeOut() {
    if (!gameStarted || shooting || currentQuestion >= 10 || lives <= 0) return;
    if (isQuestionAnswered) return;

    const optsContainer = document.getElementById('optsContainer');
    const answerInput = document.getElementById('answer');
    const submitBtn = document.getElementById('submitBtn');
    const directionBox = document.getElementById('directionBox');
    if (optsContainer) optsContainer.style.display = 'none';
    if (answerInput) answerInput.style.display = 'none';
    if (submitBtn) submitBtn.style.display = 'none';
    if (directionBox) directionBox.style.display = 'none';

    consecutiveCorrect = 0;
    isPowerShot = false;
    render();

    const q = activeQuestions[currentQuestion];
    let correctSolutionHtml = '';
    if (q) {
        if (q.type === 'mcq') {
            correctSolutionHtml = `<div style="background: #e8f8f5; border-left: 4px solid #2ecc71; padding: 10px 14px; margin: 10px 0; text-align: left; border-radius: 8px; font-size: 0.95rem; color: #27ae60;">
                <b>✅ Đáp án đúng của câu này là:</b> <span style="font-weight: 700;">${q.opts[q.ans]}</span>
            </div>`;
        } else {
            correctSolutionHtml = `<div style="background: #e8f8f5; border-left: 4px solid #2ecc71; padding: 10px 14px; margin: 10px 0; text-align: left; border-radius: 8px; font-size: 0.95rem; color: #2c3e50;">
                <b>💡 Gợi ý mẫu code đúng:</b> <code style="background: #fff; padding: 3px 8px; border-radius: 4px; color: #c0392b; font-weight: 700; font-family: monospace;">${q.h}</code>
            </div>`;
        }
    }

    showPenaltyModal(
        "⏱️ HẾT GIỜ SUY NGHĨ!",
        `Bạn đã hết thời gian làm bài cho câu hỏi này.<br>Bạn bị <b>mất lượt sút</b> câu này nhưng <b>không bị trừ tim ❤️</b>!
        ${correctSolutionHtml}
        <div style="background: #fef9e7; border-left: 4px solid #f39c12; padding: 10px 14px; margin: 10px 0; text-align: left; border-radius: 8px; font-size: 0.9rem; color: #7f8c8d;">
            <b>👉 Lưu ý:</b> Hãy quan sát đồng hồ đếm ngược và chọn câu trả lời nhanh hơn ở lượt tiếp theo nhé!
        </div>`,
        () => {
            currentQuestion++;
            showQuestion();
        }
    );
}

function removeAccents(str) {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

function containsProfanity(text) {
    if (!text) return false;
    
    // Chuẩn hóa chuỗi: chuyển chữ thường, bỏ dấu tiếng Việt, thay leetspeak cơ bản
    let raw = text.toLowerCase();
    let normalized = removeAccents(raw);
    
    // Thay thế leetspeak phổ biến: @ -> a, 0 -> o, 1/! -> i, 3 -> e, 5 -> s, 7 -> t
    let leetNormalized = normalized
        .replace(/@/g, 'a')
        .replace(/0/g, 'o')
        .replace(/[1!]/g, 'i')
        .replace(/3/g, 'e')
        .replace(/5/g, 's')
        .replace(/7/g, 't');
    
    // Loại bỏ ký tự đặc biệt & khoảng trắng để kiểm tra từ lách
    let stripped = leetNormalized.replace(/[^a-z0-9]/g, '');

    // Danh sách từ cấm (Tiếng Anh & Tiếng Việt - bao gồm cả từ viết tắt và từ lách)
    const badWords = [
        // Tiếng Anh (Slurs & Vulgarity)
        'nigga', 'nigger', 'niga', 'nigr', 'fuck', 'fuk', 'fck', 'bitch', 'btch', 'shit', 
        'asshole', 'cunt', 'dick', 'pussy', 'bastard', 'slut', 'whore', 'retard', 'penis', 'vagina',
        
        // Tiếng Việt (Chửi bậy, tục tĩu, xúc phạm)
        'dm', 'dmm', 'dcm', 'dkm', 'cl', 'clm', 'vcl', 'vl', 'vc', 'cc', 'cai l', 
        'dit', 'djt', 'du', 'dume', 'duma', 'djtme', 'ditme', 'ditconme', 'dmcs',
        'lon', 'lona', 'luz', 'cac', 'cai cac', 'buoi', 'cai buoi', 'cu', 'chim',
        'bo may', 'con me', 'suc sinh', 'oc dog', 'oc doc', 'cho đe', 'cho de',
        'do cho', 'dm', 'da m'
    ];

    // Check 1: Kiểm tra từ cấm theo từ nguyên bản & chuẩn hóa
    for (let word of badWords) {
        // Nếu là từ ngắn (2-3 ký tự như dm, cc, cl, vl) thì so sánh theo từ riêng biệt hoặc stripped match exact
        if (word.length <= 3) {
            let regex = new RegExp(`(?:^|[^a-z0-9])${word}(?:$|[^a-z0-9])`, 'i');
            if (regex.test(normalized) || regex.test(leetNormalized)) return true;
        } else {
            // Từ dài hơn (>3 ký tự) kiểm tra chứa trong chuỗi
            if (leetNormalized.includes(word) || stripped.includes(word)) return true;
        }
    }

    return false;
}

function startGame() {
    let nameInput = document.getElementById('playerNameInput').value.trim();
    let numStr = document.getElementById('playerNumberInput').value.trim();
    let gkNameInput = document.getElementById('gkNameInput').value.trim();
    let gkNumStr = document.getElementById('gkNumberInput').value.trim();

    if (!nameInput || !numStr || !gkNameInput || !gkNumStr) {
        document.getElementById('mixiNotice').style.display = 'flex';
        return;
    }

    // Kiểm tra tên vi phạm từ ngữ cấm / tiêu cực
    if (containsProfanity(nameInput) || containsProfanity(gkNameInput)) {
        alert("⚠️ Tên người chơi hoặc thủ môn chứa từ ngữ không phù hợp/tiêu cực. Vui lòng đổi tên khác lịch sự hơn!");
        return;
    }

    let numInput = parseInt(numStr, 10);
    let gkNumInput = parseInt(gkNumStr, 10);

    if (isNaN(numInput) || numInput < 1 || numInput > 99 || isNaN(gkNumInput) || gkNumInput < 1 || gkNumInput > 99) {
        alert("⚠️ Số áo người chơi và thủ môn phải nằm trong khoảng từ 1 đến 99!");
        return;
    }

    if (nameInput.length > 15) nameInput = nameInput.substring(0, 15);
    if (gkNameInput.length > 15) gkNameInput = gkNameInput.substring(0, 15);

    const charConfig = characterConfigs[characterIndex];
    const club = clubData[selectedClubId];

    player.name = nameInput.toUpperCase();
    player.number = numInput;
    player.skin = charConfig.skin;
    player.hair = charConfig.hair;
    player.hairStyle = charConfig.hairStyle;
    player.browType = charConfig.browType;
    player.facialHair = charConfig.facialHair;
    player.special = charConfig.special;
    player.faceImg = charConfig.faceImg;
    player.body = charConfig.body;
    player.shirt = selectedShirtColor;

    goalie.name = gkNameInput.toUpperCase();
    goalie.number = gkNumInput;

    playerName = player.name;
    playerNumber = player.number;

    localStorage.setItem('penalty_playerName', player.name);
    localStorage.setItem('penalty_playerNumber', player.number);
    localStorage.setItem('penalty_gkName', goalie.name);
    localStorage.setItem('penalty_gkNumber', goalie.number);
    localStorage.setItem('penalty_characterIndex', characterIndex);
    localStorage.setItem('penalty_shirtColor', selectedShirtColor);
    localStorage.setItem('penalty_clubId', selectedClubId);

    gameStarted = true;
    document.body.classList.add('game-active');
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'flex';
    setupAntiCheat();
    initGame();
}

function showQuestion() {
    if (currentQuestion >= 10) { showFinalResult(); return; }
    const q = activeQuestions[currentQuestion];

    const questionText = q.type === 'mcq' ? q.q : q.m;
    document.getElementById('question').innerText = `Câu ${currentQuestion + 1}: ${questionText}`;

    document.getElementById('hint').innerText = '';
    document.getElementById('directionBox').style.display = 'none';
    document.getElementById('result').innerText = '';
    document.getElementById('result').style.color = '#fff';

    const optsContainer = document.getElementById('optsContainer');
    const answerInput = document.getElementById('answer');
    const submitBtn = document.getElementById('submitBtn');

    if (q.type === 'mcq') {
        answerInput.style.display = 'none';
        submitBtn.style.display = 'none';
        optsContainer.style.display = 'block';
        optsContainer.innerHTML = '';

        q.opts.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'opt-btn';
            btn.innerText = opt;
            btn.onclick = () => checkMCQ(idx);
            optsContainer.appendChild(btn);
        });
    } else {
        optsContainer.style.display = 'none';
        answerInput.style.display = 'block';
        submitBtn.style.display = 'inline-block';
        answerInput.value = '';
    }

    ball = { ...ballStart, rotation: 0 };
    goalie.x = cw / 2; goalie.y = 90; goalie.rotation = 0; goalie.state = 'idle'; goalie.trail = [];
    player.x = cw / 2 - 160; player.y = ch - 100; player.state = 'idle'; player.thought = null;
    render();
    startQuestionTimer();
}

function closeMixiNotice() {
    document.getElementById('mixiNotice').style.display = 'none';
    const nameInput = document.getElementById('playerNameInput').value.trim();
    const numInput = document.getElementById('playerNumberInput').value.trim();
    const gkNameInput = document.getElementById('gkNameInput').value.trim();
    const gkNumInput = document.getElementById('gkNumberInput').value.trim();

    if (!nameInput) document.getElementById('playerNameInput').focus();
    else if (!numInput) document.getElementById('playerNumberInput').focus();
    else if (!gkNameInput) document.getElementById('gkNameInput').focus();
    else if (!gkNumInput) document.getElementById('gkNumberInput').focus();
}

function handleLifeLoss() {
    lives--;
    consecutiveCorrect = 0; // Reset combo
    isPowerShot = false;
    render();
    if (lives <= 0) {
        showGameOver();
        return true;
    }
    return false;
}

function showGameOver() {
    stopQuestionTimer();
    document.body.classList.remove('game-active');
    shooting = false;
    document.getElementById('questionBox').style.display = 'none';
    document.getElementById('directionBox').style.display = 'none';
    document.getElementById('hint').innerText = '';

    const looseAudio = document.getElementById('looseAudio');
    if (looseAudio) {
        looseAudio.currentTime = 0;
        looseAudio.play().catch(e => console.log("Loose audio play failed:", e));
    }

    saveScore(playerName, playerNumber, score);

    const resultDiv = document.getElementById("result");
    resultDiv.style.color = '#e74c3c';
    resultDiv.innerHTML = `
        <div class="game-over-container" style="text-align: center; background: rgba(255,255,255,0.9); padding: 20px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); margin-top: 20px;">
            <img src="img/batluc.jpg" alt="Game Over" style="width: 450px; max-width: 90%; border-radius: 10px; margin-bottom: 15px; border: 3px solid #e74c3c;">
            <h3 style="margin: 0; font-size: 24px;">HẾT LƯỢT! 💔</h3>
             <p style="font-size: 18px; margin: 10px 0;">Bạn đã hết tim rồi. Phải bắt đầu lại thôi!</p>
            <button class="start-game-btn" style="width: auto; padding: 10px 40px; margin-top: 10px;" onclick="location.reload()"> CHƠI LẠI </button>
        </div>
    `;
}

function checkMCQ(idx) {
    if (shooting) return;
    const q = activeQuestions[currentQuestion];
    if (idx === q.ans) {
        stopQuestionTimer();
        isQuestionAnswered = true;
        consecutiveCorrect++;
        if (consecutiveCorrect >= 3) {
            isPowerShot = true;
            document.getElementById('result').innerHTML = '<span class="powershot-text">🔥 POWERSHOT KÍCH HOẠT! 🔥</span><br>Bàn thắng tiếp theo sẽ được x2!';
        } else {
            document.getElementById('result').innerText = 'Chính xác! Bạn đã sẵn sàng sút bóng.';
        }
        document.getElementById('directionBox').style.display = 'block';
        document.getElementById('optsContainer').style.display = "none";
    } else {
        stopQuestionTimer();
        document.getElementById('optsContainer').style.display = 'none';
        const isDead = handleLifeLoss();

        showPenaltyModal(
            "❌ THÔNG BÁO BỊ TRỪ TIM (ĐÁP ÁN SAI)",
            `<b>❌ Lỗi sai:</b> Bạn đã chọn phương án <i>"${q.opts[idx]}"</i> và bị <b>trừ 1 tim ❤️</b>.
            <div style="background: #e8f8f5; border-left: 4px solid #2ecc71; padding: 10px 14px; margin: 12px 0; text-align: left; border-radius: 8px; font-size: 0.95rem; color: #27ae60;">
                <b>✅ Đáp án chính xác là:</b> <span style="font-weight: 800;">${q.opts[q.ans]}</span>
            </div>
            <div style="background: #fef9e7; border-left: 4px solid #f39c12; padding: 10px 14px; margin: 10px 0; text-align: left; border-radius: 8px; font-size: 0.9rem; color: #7f8c8d;">
                <b>👉 Thao tác đúng:</b> Đọc kỹ từng tùy chọn và phân tích kiến thức trước khi bấm chọn.
            </div>`,
            () => {
                if (!isDead) {
                    currentQuestion++;
                    showQuestion();
                }
            }
        );
    }
}

function submitAnswer() {
    if (shooting) return;
    const val = document.getElementById('answer').value.trim();
    const q = activeQuestions[currentQuestion];

    const regex = typeof q.r === 'string' ? new RegExp(q.r) : q.r;

    if (regex.test(val)) {
        stopQuestionTimer();
        isQuestionAnswered = true;
        consecutiveCorrect++;
        if (consecutiveCorrect >= 3) {
            isPowerShot = true;
            document.getElementById('result').innerHTML = '<span class="powershot-text">🔥 POWERSHOT KÍCH HOẠT! 🔥</span><br>Bàn thắng tiếp theo sẽ được x2!';
        } else {
            document.getElementById('result').innerText = 'Chính xác! Bạn đã sẵn sàng sút bóng.';
        }
        document.getElementById('directionBox').style.display = 'block';
        document.getElementById("answer").style.display = "none";
        document.getElementById("submitBtn").style.display = "none";
    } else {
        stopQuestionTimer();
        document.getElementById('answer').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'none';
        const isDead = handleLifeLoss();

        showPenaltyModal(
            "❌ THÔNG BÁO BỊ TRỪ TIM (MÃ CODE SAI)",
            `<b>❌ Lỗi sai:</b> Mã cú pháp bạn vừa nhập chưa đúng chuẩn Python và bị <b>trừ 1 tim ❤️</b>.
            <div style="background: #e8f8f5; border-left: 4px solid #2ecc71; padding: 10px 14px; margin: 12px 0; text-align: left; border-radius: 8px; font-size: 0.95rem; color: #2c3e50;">
                <b>💡 Gợi ý mẫu code đúng:</b> <code style="background: #fff; padding: 3px 8px; border-radius: 4px; color: #c0392b; font-weight: 700; font-family: monospace;">${q.h}</code>
                ${q.w ? `<br><small style="color: #7f8c8d; display: block; margin-top: 4px;">Giải thích: ${q.w}</small>` : ''}
            </div>
            <div style="background: #fef9e7; border-left: 4px solid #f39c12; padding: 10px 14px; margin: 10px 0; text-align: left; border-radius: 8px; font-size: 0.9rem; color: #7f8c8d;">
                <b>👉 Thao tác đúng:</b> Chú ý tên biến, khoảng trắng và cú pháp đúng theo gợi ý trước khi bấm Trả lời.
            </div>`,
            () => {
                if (!isDead) {
                    currentQuestion++;
                    showQuestion();
                }
            }
        );
    }
}

function shoot(dir) {
    if (shooting) return;
    shooting = true;
    document.getElementById('directionBox').style.display = 'none';
    const goalieGuess = Math.floor(Math.random() * 3);
    const isGoal = dir !== goalieGuess;
    animateShot(dir, isGoal, function () {
        if (isGoal) {
            const addedScore = isPowerShot ? 2 : 1;
            score += addedScore;
            const goalAudio = document.getElementById('goalAudio');
            if (goalAudio) {
                goalAudio.currentTime = 0;
                goalAudio.play().catch(e => console.log("Goal audio play failed:", e));
            }
            document.getElementById('result').style.color = isPowerShot ? '#ff4500' : '#2ecc71';
            const shotMsg = isPowerShot ? `SIÊU PHẨM LỬA! Ghi được x2 bàn thắng (${addedScore})!` : `VÀOOO! Thủ môn bó tay trước cú sút vào ${directions[dir]}!`;
            document.getElementById('result').innerText = shotMsg;
        } else {
            const saveAudio = document.getElementById('saveAudio');
            if (saveAudio) {
                saveAudio.currentTime = 0;
                saveAudio.play().catch(e => console.log("Save audio play failed:", e));
            }
            document.getElementById('result').style.color = '#e74c3c';
            document.getElementById('result').innerText = `KHÔNG VÀO! Thủ môn xuất sắc ở ${directions[dir]}!`;
        }
        setTimeout(() => {
            currentQuestion++;
            if (isPowerShot) {
                isPowerShot = false;
                consecutiveCorrect = 0;
            }
            shooting = false;
            showQuestion();
        }, 2000);
    });
}

function setHelperImage(imgElem, primarySrc, fallbackSrcs) {
    if (!imgElem) return;
    const fallbacks = fallbackSrcs ? [...fallbackSrcs] : [];
    imgElem.onerror = function () {
        if (fallbacks.length > 0) {
            const nextSrc = fallbacks.shift();
            imgElem.src = nextSrc;
        } else {
            imgElem.onerror = null;
        }
    };
    imgElem.src = primarySrc;
}

function updateCallPreview() {
    const person = document.querySelector('input[name="callPerson"]:checked')?.value || 'mixi';
    const callImg = document.getElementById('callImg');
    const nameElem = document.getElementById('callPersonName');

    if (person === 'messi') {
        if (nameElem) nameElem.innerText = "GOAT Lionel Messi";
        setHelperImage(callImg, 'img/messi_help.jpg', ['img/face_messi.png']);
    } else {
        if (nameElem) nameElem.innerText = "Anh Độ Mixi";
        setHelperImage(callImg, 'img/mixi.jpg', []);
    }
}

function updateWisePreview() {
    const person = document.querySelector('input[name="wisePerson"]:checked')?.value || 'TAN';
    const wiseImg = document.getElementById('wiseImg');
    const wiseIcon = document.getElementById('wiseIcon');
    const nameElem = document.getElementById('wisePersonName');

    if (person === 'truong_con') {
        if (nameElem) nameElem.innerText = "Bác Trường con Nam Định";
        setHelperImage(wiseImg, 'img/truong_con.jpg', ['img/truongcon.jpg', 'img/truongcon.png', 'img/truong_con.png']);
        if (wiseIcon) wiseIcon.innerText = "🦅";
    } else if (person === 'lukaku') {
        if (nameElem) nameElem.innerText = "Romelu Lukaku (Lakaka)";
        setHelperImage(wiseImg, 'img/lakaka.jpg', []);
        if (wiseIcon) wiseIcon.innerText = "🧱";
    } else if (person === 'cr7') {
        if (nameElem) nameElem.innerText = "Cristiano Ronaldo (CR7)";
        setHelperImage(wiseImg, 'img/Ronaldo_help.webp', ['img/Ronaldo_help', 'img/face_ronaldo.png']);
        if (wiseIcon) wiseIcon.innerText = "⚽";
    } else {
        if (nameElem) nameElem.innerText = "Bác Trương Anh Ngọc";
        setHelperImage(wiseImg, 'img/TAN.jpg', []);
        if (wiseIcon) wiseIcon.innerText = "🧙‍♂️";
    }
}

function useLifeline(type) {
    if (helps[type]) return;
    const q = activeQuestions[currentQuestion];

    if (type === 'fifty') {
        if (q.type !== 'mcq') {
            alert("Quyền trợ giúp này chỉ dành cho câu hỏi trắc nghiệm!");
            return; // Don't mark as used
        }
        helps[type] = true;
        document.getElementById(type + 'Btn').classList.add('used');

        const btns = document.querySelectorAll('.opt-btn');
        let incorrectIndices = [];
        q.opts.forEach((opt, idx) => {
            if (idx !== q.ans) incorrectIndices.push(idx);
        });

        // Pick 2 random incorrect indices to hide
        const toHide = incorrectIndices.sort(() => Math.random() - 0.5).slice(0, 2);
        toHide.forEach(idx => {
            btns[idx].style.visibility = 'hidden';
            btns[idx].style.pointerEvents = 'none';
        });
        player.thought = "Bớt đi 2 cái sai, dễ thôi mà!";
        render();
        return;
    }

    if (type === 'call') {
        document.getElementById('callSelectionBox').style.display = 'flex';
        document.getElementById('startCallBtn').style.display = 'inline-block';
        document.getElementById('closeCallBtn').style.display = 'none';
        document.getElementById('callMsg').innerText = "Chọn người bạn muốn gọi";
        document.getElementById('callMsg').style.color = "#e74c3c";
        document.getElementById('callResult').innerText = "";
        updateCallPreview();
        document.getElementById('callModal').style.display = 'flex';
    } else if (type === 'wise') {
        document.getElementById('wiseSelectionBox').style.display = 'flex';
        document.getElementById('startWiseBtn').style.display = 'inline-block';
        document.getElementById('closeWiseBtn').style.display = 'none';
        document.getElementById('wiseMsg').innerText = "Chọn nhà thông thái để hỏi";
        document.getElementById('wiseMsg').style.color = "#3498db";
        document.getElementById('wiseResult').innerText = "";
        updateWisePreview();
        document.getElementById('wiseModal').style.display = 'flex';
    }
}

function playCharacterAudio(audioId) {
    const audio = document.getElementById(audioId);
    if (audio && audio.getAttribute('src') && audio.getAttribute('src').trim() !== '') {
        audio.currentTime = 0;
        audio.play().catch(e => console.log(`Audio ${audioId} play failed:`, e));
    }
}

function stopAllLifelineAudio() {
    ['callAudio', 'callAudio_messi', 'wiseAudio', 'wiseAudio_lukaku', 'wiseAudio_cr7', 'wiseAudio_truongcon'].forEach(id => {
        const audio = document.getElementById(id);
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
}

function confirmCall() {
    const q = activeQuestions[currentQuestion];
    let resultText = (q.type === 'mcq') ? q.opts[q.ans] : (q.w || q.h || 'Gợi ý đáp án');

    helps['call'] = true;
    document.getElementById('callBtn').classList.add('used');

    document.getElementById('callSelectionBox').style.display = 'none';
    document.getElementById('startCallBtn').style.display = 'none';
    document.getElementById('closeCallBtn').style.display = 'none';

    const person = document.querySelector('input[name="callPerson"]:checked')?.value || 'mixi';
    const callImg = document.getElementById('callImg');
    const callMsg = document.getElementById('callMsg');
    const callResult = document.getElementById('callResult');

    if (person === 'messi') {
        playCharacterAudio('callAudio_messi');
        setHelperImage(callImg, 'img/messi_help.jpg', ['img/face_messi.png']);
        callMsg.style.color = "#27ae60";
        callMsg.innerText = "Đang kết nối vệ tinh gọi cho GOAT Messi...";
        setTimeout(() => {
            callMsg.innerText = "¡Hola! GOAT Lionel Messi đang trả lời!";
            callResult.innerHTML = `GOAT Messi tư vấn: <div class="highlight-code">${resultText}</div><span class="extra-msg">"Muchachos! GOAT tin tưởng tuyệt đối vào đáp án này!"</span>`;
            player.thought = "¡Muchas gracias GOAT Messi! Vamos Argentina!";
            document.getElementById('closeCallBtn').style.display = 'inline-block';
            render();
        }, 1500);
    } else {
        playCharacterAudio('callAudio');
        setHelperImage(callImg, 'img/mixi.jpg', []);
        callMsg.style.color = "#e74c3c";
        callMsg.innerText = "Số này của ai ấy nhỉ?...";
        setTimeout(() => {
            callMsg.innerText = "À, Anh Độ Mixi đây rồi!";
            callResult.innerHTML = `Anh bảo đáp án là: <div class="highlight-code">${resultText}</div><span class="extra-msg">"Em đừng có mà chối!"</span>`;
            player.thought = "Nà ná na na. Cảm ơn Anh Độ Mixi!";
            document.getElementById('closeCallBtn').style.display = 'inline-block';
            render();
        }, 1500);
    }
}

function confirmWise() {
    const q = activeQuestions[currentQuestion];
    let resultText = (q.type === 'mcq') ? q.opts[q.ans] : (q.w || q.h || 'Gợi ý đáp án');

    helps['wise'] = true;
    document.getElementById('wiseBtn').classList.add('used');

    document.getElementById('wiseSelectionBox').style.display = 'none';
    document.getElementById('startWiseBtn').style.display = 'none';
    document.getElementById('closeWiseBtn').style.display = 'none';

    const person = document.querySelector('input[name="wisePerson"]:checked')?.value || 'TAN';
    const wiseImg = document.getElementById('wiseImg');
    const wiseIcon = document.getElementById('wiseIcon');
    const wiseMsg = document.getElementById('wiseMsg');
    const wiseResult = document.getElementById('wiseResult');

    if (person === 'truong_con') {
        playCharacterAudio('wiseAudio_truongcon');
        setHelperImage(wiseImg, 'img/truong_con.jpg', ['img/truongcon.jpg', 'img/truongcon.png', 'img/truong_con.png']);
        if (wiseIcon) wiseIcon.innerText = "🦅";
        wiseMsg.style.color = "#8e44ad";
        wiseMsg.innerText = "Bác Trường con Nam Định đang nhận định...";
        setTimeout(() => {
            wiseMsg.innerText = "Bác Trường con Nam Định dặn dò kĩ càng:";
            wiseResult.innerHTML = `Bác Trường con phán: <div class="highlight-code">${resultText}</div><span class="extra-msg">"Anh em Nam Định sống bằng tình cảm, chọn đúng câu này là chuẩn bài!"</span>`;
            player.thought = "Cảm ơn bác Trường con Nam Định chuẩn chất chơi!";
            document.getElementById('closeWiseBtn').style.display = 'inline-block';
            render();
        }, 1500);
    } else if (person === 'lukaku') {
        playCharacterAudio('wiseAudio_lukaku');
        setHelperImage(wiseImg, 'img/lakaka.jpg', []);
        if (wiseIcon) wiseIcon.innerText = "🧱";
        wiseMsg.style.color = "#d35400";
        wiseMsg.innerText = "Đang nhận tư vấn từ siêu tiền đạo Lukaku...";
        setTimeout(() => {
            wiseMsg.innerText = "Chân gỗ Lukaku (Lakaka) phán truyền:";
            wiseResult.innerHTML = `Lukaku gợi ý: <div class="highlight-code">${resultText}</div><span class="extra-msg">"Tốt nhất là sút trúng người thủ môn như Lukaku nhé!"</span>`;
            player.thought = "Cảm ơn chiến thần Lakaka Lukaku!";
            document.getElementById('closeWiseBtn').style.display = 'inline-block';
            render();
        }, 1500);
    } else if (person === 'cr7') {
        playCharacterAudio('wiseAudio_cr7');
        setHelperImage(wiseImg, 'img/Ronaldo_help.webp', ['img/Ronaldo_help', 'img/face_ronaldo.png']);
        if (wiseIcon) wiseIcon.innerText = "⚽";
        wiseMsg.style.color = "#2980b9";
        wiseMsg.innerText = "Đang nhận lời tư vấn từ siêu sao CR7...";
        setTimeout(() => {
            wiseMsg.innerText = "SIUUU! CR7 phán truyền tuyệt đỉnh:";
            wiseResult.innerHTML = `Cristiano Ronaldo tư vấn: <div class="highlight-code">${resultText}</div><span class="extra-msg">"SIUUU! Sút chính xác như cú dứt điểm của CR7!"</span>`;
            player.thought = "SIUUU! Cảm ơn anh Bảy CR7!";
            document.getElementById('closeWiseBtn').style.display = 'inline-block';
            render();
        }, 1500);
    } else {
        playCharacterAudio('wiseAudio');
        setHelperImage(wiseImg, 'img/TAN.jpg', []);
        if (wiseIcon) wiseIcon.innerText = "🧙‍♂️";
        wiseMsg.style.color = "#3498db";
        wiseMsg.innerText = "Nhà thông thái đang suy nghĩ...";
        setTimeout(() => {
            wiseMsg.innerText = "Lời khuyên từ nhà thông thái (người Ý):";
            wiseResult.innerHTML = `Người Ý nói: <div class="highlight-code">${resultText}</div><span class="extra-msg">"Tin chuẩn em nhé!"</span>`;
            player.thought = "Cảm ơn bác Trông Anh Ngược!";
            document.getElementById('closeWiseBtn').style.display = 'inline-block';
            render();
        }, 1500);
    }
}

function closeModalWithoutUsing(id) {
    document.getElementById(id).style.display = 'none';
    stopAllLifelineAudio();
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
    if (id === 'callModal' || id === 'wiseModal') {
        stopAllLifelineAudio();
    } else if (id === 'finalPrizeModal') {
        const audio = document.getElementById('winAudio');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }
}

function scrollToPrizes() {
    closeModal('shotResultModal');
    document.getElementById('prizes').style.display = 'block';
    showRedEnvelopes();
    document.getElementById('prizes').scrollIntoView({ behavior: 'smooth' });
}

let picksAllowed = 0;

function showFinalResult() {
    stopQuestionTimer();
    document.body.classList.remove('game-active');
    let msg = `Bạn đã ghi được <b>${score}/10</b> bàn thắng. `;
    const openBtn = document.getElementById('openEnvelopesBtn');

    saveScore(playerName, playerNumber, score);

    if (score >= 7) {
        if (score > 10) picksAllowed = 3;
        else if (score >= 9) picksAllowed = 2;
        else picksAllowed = 1; // 7-8 bàn

        msg += `<br>Phong độ tuyệt vời! Bạn nhận được <b>${picksAllowed}</b> lượt mở bao lì xì. 🔥`;
        openBtn.style.display = 'inline-block';
    } else {
        msg += "<br>Hơi tiếc một chút! Bạn cần ít nhất 7 bàn để nhận được quà lì xì. Hãy cố gắng hơn nhé! 💪";
        openBtn.style.display = 'none';
    }

    document.getElementById('shotResultMsg').innerHTML = msg;
    document.getElementById('shotResultModal').style.display = 'flex';
    document.getElementById("questionBox").style.display = "none";
}

function showRedEnvelopes() {
    document.getElementById("prizes").style.display = "block";
    const container = document.getElementById("envelopeContainer");
    container.innerHTML = '';
    const prizes = [
        { name: "5.000 VND", icon: "💵" },
        { name: "Ra chơi sớm 5 phút", icon: "🔔" },
        { name: "Chúc bạn may mắn lần sau", icon: "🍀" },
        { name: "Chúc bạn may mắn lần sau", icon: "🍀" },
        { name: "Chúc bạn may mắn lần sau", icon: "🍀" },
        { name: "Chúc bạn may mắn lần sau", icon: "🍀" },
        { name: "100.000 VND", icon: "💰" },
        { name: "200.000 VND", icon: "🧧" }
    ];
    prizes.sort(() => Math.random() - 0.5);
    prizes.forEach((prize, index) => {
        const env = document.createElement('div');
        env.className = 'envelope';
        env.id = `env-${index}`;
        env.onclick = () => openEnvelope(index);
        env.innerHTML = `<div class="prize-content"><div class="prize-icon">${prize.icon}</div><div class="prize-value">${prize.name}</div></div>`;
        container.appendChild(env);
    });
}

let pickedPrizes = [];
function openEnvelope(index) {
    const env = document.getElementById(`env-${index}`);
    if (env.classList.contains('opened') || picksAllowed <= 0) return;

    env.classList.add('opened');
    picksAllowed--;

    const prizeValue = env.querySelector('.prize-value').innerText;
    pickedPrizes.push(prizeValue);

    if (prizeValue === "Khô gà đè tem") {
        setTimeout(() => {
            document.getElementById('prizeModal').style.display = 'flex';
        }, 800);
    }

    if (picksAllowed === 0) {
        document.getElementById("result").innerText = `Đã hết lượt mở! Hãy xem những phần quà bạn đã bỏ lỡ...`;
        document.querySelectorAll('.envelope:not(.opened)').forEach((env, i) => {
            setTimeout(() => {
                env.classList.add('revealed');
                env.onclick = null;
            }, i * 200);
        });
        document.querySelectorAll('.envelope.opened').forEach(env => env.onclick = null);

        setTimeout(async () => {
            const winAudio = document.getElementById('winAudio');
            if (winAudio) {
                winAudio.currentTime = 0;
                winAudio.play().catch(e => console.log("Win audio play failed:", e));
            }
            document.getElementById('finalPrizeMsg').innerHTML = `Bạn đã cực kỳ may mắn mở được: <br><b style="color:#c0392b; font-size: 1.3rem;">${pickedPrizes.join(" & ")}</b>! 🎁`;

            try {
                const { data } = await supabaseClient
                    .from('leaderboard')
                    .select('name, jersey_number, score')
                    .order('score', { ascending: false });

                if (data) {
                    const myRank = data.findIndex(p => p.name === playerName && p.jersey_number == playerNumber && p.score == score) + 1;
                    document.getElementById('leaderboardRank').innerText = `Xếp hạng của bạn: #${myRank > 0 ? myRank : '?'}`;
                }
            } catch (err) {
                console.error("Lỗi lấy thứ hạng:", err);
            }

            document.getElementById('finalPrizeModal').style.display = 'flex';
        }, 4000);
    } else {
        document.getElementById("result").innerText = `Đã mở: ${prizeValue}! Còn ${picksAllowed} lượt chọn nữa. 🔥`;
    }
}



window.onload = function () {
    const savedName = localStorage.getItem('penalty_playerName');
    const savedNumber = localStorage.getItem('penalty_playerNumber');
    const savedGkName = localStorage.getItem('penalty_gkName');
    const savedGkNumber = localStorage.getItem('penalty_gkNumber');
    const savedChar = localStorage.getItem('penalty_characterIndex');
    const savedClub = localStorage.getItem('penalty_clubId');

    if (savedName) document.getElementById('playerNameInput').value = savedName;
    if (savedNumber) document.getElementById('playerNumberInput').value = savedNumber;
    if (savedGkName) document.getElementById('gkNameInput').value = savedGkName;
    if (savedGkNumber) document.getElementById('gkNumberInput').value = savedGkNumber;

    if (savedChar !== null) {
        selectChar(parseInt(savedChar));
    }

    if (savedClub) {
        const clubEl = document.getElementById('club-' + savedClub);
        if (clubEl) {
            selectClub(savedClub, clubEl);
        }
    }
    renderLeaderboard();
};

async function renderLeaderboard() {
    const listElement = document.getElementById('leaderboardList');
    if (!listElement) return;

    const filterVal = document.getElementById('leaderboardFilter')?.value || "1";

    try {
        const { data: leaderboard, error } = await supabaseClient
            .from('leaderboard')
            .select('*')
            .eq('module', filterVal)
            .order('score', { ascending: false })
            .limit(10);

        if (error) throw error;

        if (!leaderboard || leaderboard.length === 0) {
            listElement.innerHTML = '<div class="empty-state">Chưa có dữ liệu xếp hạng</div>';
            return;
        }

        listElement.innerHTML = leaderboard.map((player, index) => {
            let rankIcon = index + 1;
            if (index === 0) rankIcon = "🥇";
            else if (index === 1) rankIcon = "🥈";
            else if (index === 2) rankIcon = "🥉";

            const displayDate = player.created_at ? new Date(player.created_at).toLocaleString('vi-VN') : 'Mới';

            return `
                <div class="leader-item">
                    <div class="rank">${rankIcon}</div>
                    <div class="leader-info">
                        <span class="leader-name">${player.name} #${player.jersey_number}</span>
                        <span class="leader-meta">${displayDate}</span>
                    </div>
                    <div class="leader-score">${player.score}</div>
                </div>
            `;
        }).join('');
    } catch (err) {
        console.error("Lỗi khi tải bảng xếp hạng:", err);
        listElement.innerHTML = '<div class="empty-state" style="color:#e74c3c">Lỗi kết nối bảng xếp hạng</div>';
    }
}

async function saveScore(name, jerseyNumber, finalScore) {
    const jNum = parseInt(jerseyNumber, 10) || 0;
    try {
        const { data: records, error: fetchError } = await supabaseClient
            .from('leaderboard')
            .select('*')
            .eq('name', name)
            .eq('jersey_number', jNum)
            .eq('module', selectedModule.toString())
            .order('score', { ascending: false })
            .limit(1);

        if (fetchError) throw fetchError;

        const existing = records && records.length > 0 ? records[0] : null;

        if (existing) {
            if (finalScore > existing.score) {
                const { error: updateError } = await supabaseClient
                    .from('leaderboard')
                    .update({ score: finalScore })
                    .eq('id', existing.id);
                if (updateError) throw updateError;
                console.log("Cập nhật điểm thành công!");
            }
        } else {
            const { error: insertError } = await supabaseClient
                .from('leaderboard')
                .insert([{ name, jersey_number: jNum, score: finalScore, module: selectedModule.toString() }]);
            if (insertError) throw insertError;
            console.log("Lưu điểm mới thành công!");
        }

        if (document.getElementById('leaderboardFilter')) {
            document.getElementById('leaderboardFilter').value = selectedModule.toString();
        }
        renderLeaderboard();
    } catch (err) {
        console.error("Lỗi Supabase chi tiết:", err);
        const errorMsg = err.message || (typeof err === 'string' ? err : 'Lỗi không xác định');
        alert("LƯU ĐIỂM THẤT BẠI!\n\nMã lỗi: " + errorMsg + "\n\nLời khuyên: Bạn hãy nhấn F12 (hoặc Chuột phải -> Kiểm tra) và xem tab 'Console' để thấy chi tiết lỗi màu đỏ nhé!");
    }
}

