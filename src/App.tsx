import { FormEvent, ReactNode, useMemo, useState } from "react";

type Page =
  | "Dashboard"
  | "Students"
  | "Staff"
  | "Maintenance Requests"
  | "Facilities"
  | "Reports"
  | "Settings";

type IconName =
  | "grid"
  | "students"
  | "staff"
  | "tools"
  | "building"
  | "chart"
  | "settings"
  | "search"
  | "bell"
  | "plus"
  | "arrow"
  | "more"
  | "filter"
  | "download"
  | "menu"
  | "close"
  | "check"
  | "clock"
  | "eye"
  | "edit"
  | "trash"
  | "upload"
  | "lock"
  | "mail"
  | "calendar"
  | "logout";

const paths: Record<IconName, ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
  students: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  staff: <><circle cx="12" cy="8" r="4"/><path d="M5.3 21a7 7 0 0 1 13.4 0M18 10h4M20 8v4"/></>,
  tools: <><path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 8.4 7.2 6.1 4.9a4 4 0 0 0 5 5l-8.5 8.5a2 2 0 0 0 2.8 2.8l8.5-8.5a4 4 0 0 0 5-5L16.6 10 13 6.4z"/></>,
  building: <><path d="M3 21h18M6 21V4h12v17M9 8h2M13 8h2M9 12h2M13 12h2M10 21v-5h4v5"/></>,
  chart: <><path d="M3 3v18h18"/><path d="m7 16 4-5 4 3 5-7"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 0 1-4 0v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88L4.2 6.66a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 0 1 4 0v.09a1.7 1.7 0 0 0 1 1.51 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.12.37.34.7.64.95.3.25.68.39 1.07.4H21a2 2 0 0 1 0 4h-.09a1.7 1.7 0 0 0-1.51.65z"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  arrow: <><path d="m9 18 6-6-6-6"/></>,
  more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
  filter: <><path d="M4 5h16M7 12h10M10 19h4"/></>,
  download: <><path d="M12 3v12M7 10l5 5 5-5M4 21h16"/></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
  close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  check: <><path d="m5 12 4 4L19 6"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>,
  edit: <><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"/></>,
  trash: <><path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/></>,
  upload: <><path d="M12 16V4M7 9l5-5 5 5M4 20h16"/></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
  logout: <><path d="M10 17l5-5-5-5M15 12H3M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/></>,
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const nav: { label: Page; icon: IconName }[] = [
  { label: "Dashboard", icon: "grid" },
  { label: "Students", icon: "students" },
  { label: "Staff", icon: "staff" },
  { label: "Maintenance Requests", icon: "tools" },
  { label: "Facilities", icon: "building" },
  { label: "Reports", icon: "chart" },
  { label: "Settings", icon: "settings" },
];

const requests = [
  { id: "MNT-2048", title: "Ceiling fan not working", location: "Block A · A203", category: "Electrical", priority: "High", date: "24 May, 2025", staff: "R. Kumar", status: "In Progress" },
  { id: "MNT-2047", title: "Water leakage near sink", location: "Science Block · S104", category: "Plumbing", priority: "Urgent", date: "24 May, 2025", staff: "M. Selvam", status: "Pending" },
  { id: "MNT-2046", title: "Broken laboratory stool", location: "Block A · A101", category: "Laboratory", priority: "Medium", date: "23 May, 2025", staff: "P. Arjun", status: "Resolved" },
  { id: "MNT-2045", title: "Projector display flickering", location: "Block B · B201", category: "Electrical", priority: "Medium", date: "22 May, 2025", staff: "R. Kumar", status: "In Progress" },
  { id: "MNT-2044", title: "Window latch damaged", location: "Hostel Block · H112", category: "Furniture", priority: "Low", date: "21 May, 2025", staff: "Unassigned", status: "Rejected" },
  { id: "MNT-2043", title: "AC cooling issue", location: "Admin Block · G012", category: "Electrical", priority: "High", date: "20 May, 2025", staff: "R. Kumar", status: "Resolved" },
];

const initialStudents = [
  { id: "CCS24018", name: "Ananya Raman", department: "Computer Science", course: "B.Sc Computer Science", year: "III", email: "ananya.r@campus.edu", phone: "+91 98765 41230", initials: "AR" },
  { id: "CIT24031", name: "Rahul Krishnan", department: "Information Technology", course: "B.Tech IT", year: "II", email: "rahul.k@campus.edu", phone: "+91 94452 10983", initials: "RK" },
  { id: "CEC23012", name: "Meera Joseph", department: "Electronics", course: "B.E ECE", year: "III", email: "meera.j@campus.edu", phone: "+91 98401 78214", initials: "MJ" },
  { id: "CME25007", name: "Vikram Patel", department: "Mechanical Engineering", course: "B.E Mechanical", year: "I", email: "vikram.p@campus.edu", phone: "+91 97890 33451", initials: "VP" },
  { id: "CCI23024", name: "Nila Srinivasan", department: "Civil Engineering", course: "B.E Civil", year: "IV", email: "nila.s@campus.edu", phone: "+91 99628 74218", initials: "NS" },
];

const staff = [
  { id: "STF-1024", name: "Dr. Lakshmi Menon", department: "Computer Science", designation: "Professor & HOD", email: "lakshmi.m@campus.edu", phone: "+91 98401 22914", status: "Active", initials: "LM" },
  { id: "STF-1048", name: "Ramesh Kumar", department: "Campus Operations", designation: "Electrical Technician", email: "ramesh.k@campus.edu", phone: "+91 94442 71829", status: "Active", initials: "RK" },
  { id: "STF-1052", name: "Muthu Selvam", department: "Campus Operations", designation: "Plumbing Technician", email: "muthu.s@campus.edu", phone: "+91 98847 52103", status: "Active", initials: "MS" },
  { id: "STF-1036", name: "Priya Nair", department: "Administration", designation: "Office Superintendent", email: "priya.n@campus.edu", phone: "+91 97898 34116", status: "Active", initials: "PN" },
  { id: "STF-1061", name: "Arjun Prakash", department: "Campus Operations", designation: "General Technician", email: "arjun.p@campus.edu", phone: "+91 98408 66172", status: "Inactive", initials: "AP" },
];

const facilities = [
  { id: "FAC-001", name: "Computer Laboratory", building: "Block A", room: "A101", type: "Laboratory", condition: "Good", issues: 2 },
  { id: "FAC-002", name: "Lecture Hall", building: "Block B", room: "B201", type: "Classroom", condition: "Needs Repair", issues: 3 },
  { id: "FAC-003", name: "Boys Hostel – East Wing", building: "Hostel Block", room: "H101–H130", type: "Hostel", condition: "Good", issues: 1 },
  { id: "FAC-004", name: "Central Library", building: "Block C", room: "C001", type: "Library", condition: "Good", issues: 0 },
  { id: "FAC-005", name: "Chemistry Laboratory", building: "Science Block", room: "S104", type: "Laboratory", condition: "Under Maintenance", issues: 4 },
  { id: "FAC-006", name: "Administrative Office", building: "Admin Block", room: "G012", type: "Office", condition: "Good", issues: 1 },
];

function Button({ children, variant = "primary", icon, onClick, type = "button", className = "" }: { children?: ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger"; icon?: IconName; onClick?: () => void; type?: "button" | "submit"; className?: string }) {
  return <button type={type} onClick={onClick} className={`btn btn-${variant} ${className}`}>{icon && <Icon name={icon} />}{children}</button>;
}

function Badge({ children, tone }: { children: ReactNode; tone?: string }) {
  const resolved = tone || String(children).toLowerCase().replaceAll(" ", "-");
  return <span className={`badge badge-${resolved}`}><i />{children}</span>;
}

function SectionTitle({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return <div className="page-heading"><div><div className="page-title">{title}</div>{subtitle && <div className="page-subtitle">{subtitle}</div>}</div>{actions && <div className="heading-actions">{actions}</div>}</div>;
}

function Avatar({ initials, large = false }: { initials: string; large?: boolean }) {
  return <span className={`avatar ${large ? "avatar-large" : ""}`}>{initials}</span>;
}

function SearchFilter({ placeholder = "Search...", onSearch }: { placeholder?: string; onSearch?: (v: string) => void }) {
  return <div className="search-field"><Icon name="search" /><input aria-label={placeholder} placeholder={placeholder} onChange={(e) => onSearch?.(e.target.value)} /></div>;
}

function Toolbar({ placeholder, onSearch, children }: { placeholder: string; onSearch?: (v: string) => void; children?: ReactNode }) {
  return <div className="toolbar"><SearchFilter placeholder={placeholder} onSearch={onSearch} /><div className="toolbar-actions"><Button variant="secondary" icon="filter">Filters</Button>{children}</div></div>;
}

function Modal({ title, subtitle, onClose, children, wide = false }: { title: string; subtitle?: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><div className={`modal ${wide ? "modal-wide" : ""}`} role="dialog" aria-modal="true"><div className="modal-head"><div><div className="modal-title">{title}</div>{subtitle && <div className="modal-subtitle">{subtitle}</div>}</div><Button variant="ghost" icon="close" onClick={onClose} /></div>{children}</div></div>;
}

function Field({ label, required, children, hint }: { label: string; required?: boolean; children: ReactNode; hint?: string }) {
  return <label className="field"><span>{label}{required && <b> *</b>}</span>{children}{hint && <small>{hint}</small>}</label>;
}

function App() {
  const [page, setPage] = useState<Page>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState<null | "student" | "request" | "facility" | "studentDetail" | "requestDetail" | "confirm">(null);
  const [toast, setToast] = useState("");
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  };

  const navigate = (next: Page) => {
    setPage(next);
    setSidebarOpen(false);
  };

  if (!loggedIn) return <Login onLogin={() => { setLoggedIn(true); setPage("Dashboard"); notify("Welcome back, Dr. Kavitha"); }} />;

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand"><Logo /><div><strong>CampusCare</strong><span>Management System</span></div><button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><Icon name="close" /></button></div>
        <div className="nav-label">WORKSPACE</div>
        <nav>{nav.map((item) => <button key={item.label} onClick={() => navigate(item.label)} className={page === item.label ? "active" : ""}><Icon name={item.icon} /><span>{item.label}</span>{page === item.label && <Icon name="arrow" size={15} />}</button>)}</nav>
        <div className="sidebar-help"><div className="help-icon"><Icon name="tools" /></div><strong>Need help?</strong><span>Contact campus IT support</span><button onClick={() => notify("Support request opened")}>Get support</button></div>
        <button className="sidebar-user" onClick={() => navigate("Settings")}><Avatar initials="DK" /><span><strong>Dr. Kavitha Rao</strong><small>Administrator</small></span><Icon name="more" /></button>
      </aside>
      {sidebarOpen && <div className="sidebar-scrim" onClick={() => setSidebarOpen(false)} />}
      <main>
        <header>
          <button className="mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Icon name="menu" /></button>
          <div className="crumb"><span>CampusCare</span><Icon name="arrow" size={14} /><strong>{page}</strong></div>
          <div className="header-actions"><SearchFilter placeholder="Search CampusCare" /><button className="icon-button" aria-label="Notifications"><Icon name="bell" /><i /></button><div className="header-profile"><Avatar initials="DK" /><div><strong>Dr. Kavitha Rao</strong><span>Admin</span></div></div></div>
        </header>
        <div className="content">
          {page === "Dashboard" && <Dashboard navigate={navigate} openModal={setModal} />}
          {page === "Students" && <StudentsPage students={students} search={search} setSearch={setSearch} openModal={setModal} />}
          {page === "Staff" && <StaffPage openModal={setModal} notify={notify} />}
          {page === "Maintenance Requests" && <MaintenancePage openModal={setModal} />}
          {page === "Facilities" && <FacilitiesPage openModal={setModal} />}
          {page === "Reports" && <ReportsPage notify={notify} />}
          {page === "Settings" && <SettingsPage notify={notify} logout={() => setLoggedIn(false)} />}
        </div>
      </main>
      {modal === "student" && <StudentModal onClose={() => setModal(null)} onSave={(student) => { setStudents([student, ...students]); setModal(null); notify("Student record added successfully"); }} />}
      {modal === "request" && <RequestModal onClose={() => setModal(null)} onSave={() => { setModal(null); notify("Maintenance request MNT-2049 created"); }} />}
      {modal === "facility" && <FacilityModal onClose={() => setModal(null)} onSave={() => { setModal(null); notify("Facility added successfully"); }} />}
      {modal === "studentDetail" && <StudentDetail onClose={() => setModal(null)} />}
      {modal === "requestDetail" && <RequestDetail onClose={() => setModal(null)} notify={notify} />}
      {modal === "confirm" && <ConfirmModal onClose={() => setModal(null)} onConfirm={() => { setModal(null); notify("Staff account deactivated"); }} />}
      {toast && <div className="toast"><span><Icon name="check" /></span><div><strong>Success</strong><small>{toast}</small></div><button onClick={() => setToast("")}><Icon name="close" size={16} /></button></div>}
    </div>
  );
}

function Logo() {
  return <div className="logo-mark"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M5 14 20 6l15 8-15 8z"/><path d="M10 18v9c5 5 15 5 20 0v-9"/><path d="M35 14v11"/></svg></div>;
}

function Dashboard({ navigate, openModal }: { navigate: (p: Page) => void; openModal: (m: "student" | "request") => void }) {
  const stats = [
    { label: "Total students", value: "2,847", change: "+6.2%", note: "vs last semester", icon: "students" as IconName, tone: "blue" },
    { label: "Total staff", value: "186", change: "+3.1%", note: "12 departments", icon: "staff" as IconName, tone: "purple" },
    { label: "Open requests", value: "38", change: "8 urgent", note: "Requires attention", icon: "tools" as IconName, tone: "orange" },
    { label: "Requests completed", value: "1,264", change: "+12.4%", note: "This academic year", icon: "check" as IconName, tone: "green" },
  ];
  return <>
    <SectionTitle title="Good morning, Dr. Kavitha" subtitle="Here’s what’s happening across campus today." actions={<><Button variant="secondary" icon="students" onClick={() => openModal("student")}>Add student</Button><Button icon="plus" onClick={() => openModal("request")}>New request</Button></>} />
    <div className="stat-grid">{stats.map((s) => <div className="stat-card" key={s.label}><div className={`stat-icon ${s.tone}`}><Icon name={s.icon} /></div><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div><div className="stat-meta"><b>{s.change}</b><span>{s.note}</span></div></div>)}</div>
    <div className="dashboard-grid">
      <section className="card activity-card"><div className="card-head"><div><strong>Maintenance activity</strong><span>Requests received and resolved</span></div><select aria-label="Activity period"><option>Last 6 months</option><option>This year</option></select></div><ActivityChart /></section>
      <section className="card status-card"><div className="card-head"><div><strong>Request status</strong><span>Current distribution</span></div><button className="more-button"><Icon name="more" /></button></div><StatusChart /></section>
    </div>
    <section className="card table-card"><div className="card-head"><div><strong>Recent maintenance requests</strong><span>Latest issues reported across campus</span></div><Button variant="ghost" onClick={() => navigate("Maintenance Requests")}>View all <Icon name="arrow" /></Button></div><RequestTable rows={requests.slice(0, 5)} onRow={() => navigate("Maintenance Requests")} /></section>
  </>;
}

function ActivityChart() {
  const received = [54, 72, 58, 83, 68, 92];
  const resolved = [38, 51, 47, 61, 59, 73];
  return <div className="chart-wrap"><div className="chart-legend"><span><i className="legend-blue" />Received</span><span><i className="legend-green" />Resolved</span></div><div className="bars">{received.map((v, i) => <div className="bar-group" key={i}><div className="bar-pair"><i className="bar-blue" style={{ height: `${v}%` }} /><i className="bar-green" style={{ height: `${resolved[i]}%` }} /></div><span>{["Dec", "Jan", "Feb", "Mar", "Apr", "May"][i]}</span></div>)}</div></div>;
}

function StatusChart() {
  return <div className="status-content"><div className="donut"><div><strong>142</strong><span>Total</span></div></div><div className="status-list"><div><span><i className="dot pending" />Pending</span><b>38</b></div><div><span><i className="dot progress" />In progress</span><b>42</b></div><div><span><i className="dot resolved" />Resolved</span><b>56</b></div><div><span><i className="dot rejected" />Rejected</span><b>6</b></div></div></div>;
}

function RequestTable({ rows, onRow }: { rows: typeof requests; onRow?: () => void }) {
  return <div className="table-scroll"><table><thead><tr><th>Request</th><th>Location</th><th>Priority</th><th>Assigned to</th><th>Status</th><th /></tr></thead><tbody>{rows.map((r) => <tr key={r.id} onClick={onRow}><td><div className="primary-cell"><strong>{r.title}</strong><span>{r.id} · {r.category}</span></div></td><td><span className="cell-main">{r.location}</span><span className="cell-sub">{r.date}</span></td><td><Badge>{r.priority}</Badge></td><td><span className="staff-cell"><Avatar initials={r.staff === "Unassigned" ? "—" : r.staff.split(" ").map(x => x[0]).join("")} />{r.staff}</span></td><td><Badge>{r.status}</Badge></td><td><button className="row-more" aria-label="More actions"><Icon name="more" /></button></td></tr>)}</tbody></table></div>;
}

function StudentsPage({ students, search, setSearch, openModal }: { students: typeof initialStudents; search: string; setSearch: (v: string) => void; openModal: (m: "student" | "studentDetail") => void }) {
  const filtered = useMemo(() => students.filter(s => `${s.name} ${s.id} ${s.department}`.toLowerCase().includes(search.toLowerCase())), [students, search]);
  return <>
    <SectionTitle title="Student records" subtitle="Manage student information and academic records." actions={<Button icon="plus" onClick={() => openModal("student")}>Add student</Button>} />
    <div className="summary-strip"><div><span>All students</span><strong>2,847</strong></div><div><span>Undergraduate</span><strong>2,396</strong></div><div><span>Postgraduate</span><strong>451</strong></div><div><span>New this year</span><strong>684</strong></div></div>
    <section className="card table-card">
      <Toolbar placeholder="Search by name, ID or department" onSearch={setSearch}><select aria-label="Department"><option>All departments</option><option>Computer Science</option><option>Information Technology</option></select></Toolbar>
      <div className="table-scroll"><table><thead><tr><th>Student</th><th>Department & course</th><th>Year</th><th>Contact</th><th>Actions</th></tr></thead><tbody>{filtered.map((s) => <tr key={s.id}><td><span className="person-cell"><Avatar initials={s.initials} /><span><strong>{s.name}</strong><small>{s.id}</small></span></span></td><td><span className="cell-main">{s.department}</span><span className="cell-sub">{s.course}</span></td><td><span className="year-pill">{s.year}</span></td><td><span className="cell-main">{s.email}</span><span className="cell-sub">{s.phone}</span></td><td><div className="row-actions"><button onClick={() => openModal("studentDetail")} title="View"><Icon name="eye" /></button><button title="Edit"><Icon name="edit" /></button><button title="Delete"><Icon name="trash" /></button></div></td></tr>)}</tbody></table></div>
      {filtered.length === 0 ? <EmptyState title="No students found" message="Try adjusting your search or filters." /> : <Pagination total="2,847" />}
    </section>
  </>;
}

function StaffPage({ openModal, notify }: { openModal: (m: "confirm" | "request") => void; notify: (m: string) => void }) {
  return <>
    <SectionTitle title="Staff directory" subtitle="Manage faculty, administrative, and maintenance staff." actions={<Button icon="plus" onClick={() => notify("Add staff form ready")}>Add staff</Button>} />
    <section className="card table-card"><Toolbar placeholder="Search staff by name or ID"><select aria-label="Department"><option>All departments</option><option>Campus Operations</option><option>Administration</option></select></Toolbar>
    <div className="table-scroll"><table><thead><tr><th>Staff member</th><th>Department</th><th>Designation</th><th>Contact</th><th>Status</th><th>Actions</th></tr></thead><tbody>{staff.map((s) => <tr key={s.id}><td><span className="person-cell"><Avatar initials={s.initials} /><span><strong>{s.name}</strong><small>{s.id}</small></span></span></td><td>{s.department}</td><td>{s.designation}</td><td><span className="cell-main">{s.email}</span><span className="cell-sub">{s.phone}</span></td><td><Badge tone={s.status === "Active" ? "active" : "inactive"}>{s.status}</Badge></td><td><div className="row-actions"><button title="View"><Icon name="eye" /></button><button title="Assign request" onClick={() => openModal("request")}><Icon name="tools" /></button><button title="Deactivate" onClick={() => openModal("confirm")}><Icon name="trash" /></button></div></td></tr>)}</tbody></table></div><Pagination total="186" /></section>
  </>;
}

function MaintenancePage({ openModal }: { openModal: (m: "request" | "requestDetail") => void }) {
  const [status, setStatus] = useState("All");
  const visible = status === "All" ? requests : requests.filter(r => r.status === status);
  return <>
    <SectionTitle title="Maintenance requests" subtitle="Track, assign, and resolve campus maintenance issues." actions={<Button icon="plus" onClick={() => openModal("request")}>Create request</Button>} />
    <div className="request-stats"><div><span className="mini-icon pending"><Icon name="clock" /></span><p><b>38</b><small>Pending</small></p></div><div><span className="mini-icon progress"><Icon name="tools" /></span><p><b>42</b><small>In progress</small></p></div><div><span className="mini-icon resolved"><Icon name="check" /></span><p><b>56</b><small>Resolved this month</small></p></div><div><span className="mini-icon urgent">!</span><p><b>8</b><small>Urgent</small></p></div></div>
    <section className="card table-card"><div className="status-tabs">{["All", "Pending", "In Progress", "Resolved", "Rejected"].map(x => <button className={status === x ? "active" : ""} onClick={() => setStatus(x)} key={x}>{x}{x === "All" && <span>142</span>}</button>)}</div><Toolbar placeholder="Search request ID, issue or location"><select aria-label="Category"><option>All categories</option><option>Electrical</option><option>Plumbing</option></select><select aria-label="Priority"><option>All priorities</option><option>Urgent</option><option>High</option></select></Toolbar><RequestTable rows={visible} onRow={() => openModal("requestDetail")} /><Pagination total="142" /></section>
  </>;
}

function FacilitiesPage({ openModal }: { openModal: (m: "facility") => void }) {
  return <>
    <SectionTitle title="Facilities management" subtitle="Monitor buildings, rooms, and campus infrastructure." actions={<Button icon="plus" onClick={() => openModal("facility")}>Add facility</Button>} />
    <div className="facility-overview"><div><Icon name="building" /><span><b>48</b><small>Total facilities</small></span></div><div><Icon name="grid" /><span><b>126</b><small>Rooms & labs</small></span></div><div><Icon name="tools" /><span><b>11</b><small>Open issues</small></span></div></div>
    <section className="card table-card"><Toolbar placeholder="Search facilities or buildings"><select aria-label="Facility type"><option>All facility types</option><option>Laboratory</option><option>Classroom</option></select></Toolbar><div className="facility-grid">{facilities.map(f => <article className="facility-card" key={f.id}><div className="facility-icon"><Icon name={f.type === "Laboratory" ? "tools" : "building"} /></div><div className="facility-card-head"><span>{f.id}</span><Badge>{f.condition}</Badge></div><strong>{f.name}</strong><p>{f.building} · Room {f.room}</p><div className="facility-footer"><span><i className={f.issues ? "has-issues" : ""} />{f.issues} open {f.issues === 1 ? "issue" : "issues"}</span><Button variant="ghost">View details <Icon name="arrow" /></Button></div></article>)}</div><Pagination total="48" /></section>
  </>;
}

function ReportsPage({ notify }: { notify: (m: string) => void }) {
  return <>
    <SectionTitle title="Reports & analytics" subtitle="Understand trends across records and campus maintenance." actions={<><Button variant="secondary" icon="calendar">01 Jan – 31 May 2025</Button><Button icon="download" onClick={() => notify("Report exported to CSV")}>Export CSV</Button></>} />
    <div className="report-highlights"><div><span>Resolution rate</span><strong>82.4%</strong><small>↑ 6.8% from previous period</small></div><div><span>Average resolution time</span><strong>2.6 days</strong><small>↓ 0.4 days improvement</small></div><div><span>Most reported category</span><strong>Electrical</strong><small>31% of all requests</small></div></div>
    <div className="dashboard-grid reports-grid"><section className="card"><div className="card-head"><div><strong>Requests by category</strong><span>Distribution for selected period</span></div></div><CategoryBars /></section><section className="card"><div className="card-head"><div><strong>Pending vs resolved</strong><span>Monthly comparison</span></div></div><LineChart /></section></div>
    <div className="dashboard-grid reports-grid"><section className="card report-summary"><div className="card-head"><div><strong>Student records summary</strong><span>Enrollment by department</span></div></div>{[["Computer Science", "728", "82%"], ["Information Technology", "614", "69%"], ["Electronics", "538", "60%"], ["Mechanical", "502", "56%"], ["Civil Engineering", "465", "52%"]].map(x => <div className="summary-row" key={x[0]}><span>{x[0]}</span><i><b style={{ width: x[2] }} /></i><strong>{x[1]}</strong></div>)}</section><section className="card report-summary"><div className="card-head"><div><strong>Staff records summary</strong><span>Workforce by department</span></div></div>{[["Academic staff", "128"], ["Campus Operations", "26"], ["Administration", "18"], ["Library & Support", "14"]].map(x => <div className="staff-summary" key={x[0]}><span><i className="dot resolved" />{x[0]}</span><strong>{x[1]}</strong></div>)}</section></div>
  </>;
}

function CategoryBars() {
  return <div className="category-chart">{[["Electrical", 86, 44], ["Plumbing", 68, 35], ["Furniture", 51, 26], ["Cleaning", 39, 20], ["Laboratory", 27, 14], ["Other", 18, 9]].map(x => <div key={x[0]}><span>{x[0]}</span><i><b style={{ width: `${x[1]}%` }} /></i><strong>{x[2]}</strong></div>)}</div>;
}

function LineChart() {
  return <div className="line-chart"><div className="chart-legend"><span><i className="legend-blue" />Resolved</span><span><i className="legend-orange" />Pending</span></div><svg viewBox="0 0 500 200" preserveAspectRatio="none"><defs><linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2563eb" stopOpacity=".2"/><stop offset="1" stopColor="#2563eb" stopOpacity="0"/></linearGradient></defs><path className="area" d="M10 160 C70 130,90 145,125 110 S200 125,245 70 S320 105,365 55 S430 75,490 30 L490 190 L10 190Z"/><path className="resolved-line" d="M10 160 C70 130,90 145,125 110 S200 125,245 70 S320 105,365 55 S430 75,490 30"/><path className="pending-line" d="M10 70 C60 90,85 60,125 100 S205 90,245 125 S315 110,365 140 S430 115,490 145"/></svg><div className="line-labels"><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span></div></div>;
}

function SettingsPage({ notify, logout }: { notify: (m: string) => void; logout: () => void }) {
  return <>
    <SectionTitle title="Profile & settings" subtitle="Manage your account, security, and preferences." />
    <div className="settings-layout"><aside className="settings-nav"><button className="active"><Icon name="students" />My profile</button><button><Icon name="lock" />Security</button><button><Icon name="bell" />Notifications</button></aside><div className="settings-content">
      <section className="card settings-card"><div className="settings-title"><strong>Personal information</strong><span>Update your photo and personal details.</span></div><div className="profile-photo"><Avatar initials="DK" large /><div><Button variant="secondary">Change photo</Button><span>JPG or PNG, maximum 2 MB.</span></div></div><div className="form-grid"><Field label="Full name"><input defaultValue="Dr. Kavitha Rao" /></Field><Field label="Staff ID"><input defaultValue="ADM-1001" disabled /></Field><Field label="Email address"><input defaultValue="kavitha.rao@campus.edu" /></Field><Field label="Phone number"><input defaultValue="+91 98401 24786" /></Field><Field label="Role"><input defaultValue="Administrator" disabled /></Field><Field label="Department"><input defaultValue="Administration" /></Field></div><div className="form-actions"><Button variant="secondary">Cancel</Button><Button onClick={() => notify("Profile changes saved")}>Save changes</Button></div></section>
      <section className="card settings-card"><div className="settings-title"><strong>Notification preferences</strong><span>Choose which updates you want to receive.</span></div>{[["Urgent maintenance alerts", "Immediate alerts for urgent campus issues"], ["Assignment updates", "When a request is assigned or reassigned"], ["Weekly summary", "A weekly campus activity digest"]].map((n, i) => <label className="toggle-row" key={n[0]}><span><strong>{n[0]}</strong><small>{n[1]}</small></span><input type="checkbox" defaultChecked={i < 2} /><i /></label>)}</section>
      <section className="card danger-zone"><div><strong>Sign out of CampusCare</strong><span>You’ll need your credentials to sign back in.</span></div><Button variant="danger" icon="logout" onClick={logout}>Sign out</Button></section>
    </div></div>
  </>;
}

function Pagination({ total }: { total: string }) {
  return <div className="pagination"><span>Showing 1 to 5 of {total} records</span><div><button disabled>Previous</button><button className="active">1</button><button>2</button><button>3</button><button>Next</button></div></div>;
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return <div className="empty-state"><span><Icon name="search" /></span><strong>{title}</strong><p>{message}</p></div>;
}

function StudentModal({ onClose, onSave }: { onClose: () => void; onSave: (s: typeof initialStudents[number]) => void }) {
  const [error, setError] = useState("");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (!form.get("name") || !form.get("email")) return setError("Please complete all required fields.");
    onSave({ id: "CCS25041", name: String(form.get("name")), department: String(form.get("department")), course: "B.Sc Computer Science", year: "I", email: String(form.get("email")), phone: String(form.get("phone")), initials: String(form.get("name")).split(" ").map(x => x[0]).slice(0,2).join("").toUpperCase() });
  };
  return <Modal title="Add new student" subtitle="Create a student profile and academic record." onClose={onClose} wide><form onSubmit={submit}><div className="modal-body"><div className="form-grid"><Field label="Full name" required><input name="name" placeholder="Enter student’s full name" /></Field><Field label="Register number" required><input name="register" placeholder="e.g. CCS25041" /></Field><Field label="Email address" required><input name="email" type="email" placeholder="student@campus.edu" /></Field><Field label="Phone number"><input name="phone" placeholder="+91 00000 00000" /></Field><Field label="Department" required><select name="department"><option>Computer Science</option><option>Information Technology</option><option>Electronics</option><option>Mechanical Engineering</option><option>Civil Engineering</option></select></Field><Field label="Course" required><select><option>B.Sc Computer Science</option><option>B.Tech Information Technology</option><option>B.E Electronics</option></select></Field><Field label="Year of study" required><select><option>I</option><option>II</option><option>III</option><option>IV</option></select></Field><Field label="Admission year"><input type="number" defaultValue="2025" /></Field></div>{error && <div className="form-error">Please complete the highlighted fields. Email must be a valid college email.</div>}</div><div className="modal-actions"><Button variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit">Add student</Button></div></form></Modal>;
}

function RequestModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  return <Modal title="Create maintenance request" subtitle="Report an issue for the campus operations team." onClose={onClose} wide><form onSubmit={(e) => { e.preventDefault(); onSave(); }}><div className="modal-body"><div className="form-grid"><Field label="Issue title" required><input placeholder="Briefly describe the issue" required /></Field><Field label="Category" required><select><option>Select category</option><option>Electrical</option><option>Plumbing</option><option>Furniture</option><option>Laboratory</option><option>Classroom</option><option>Hostel</option><option>Cleaning</option><option>Other</option></select></Field><Field label="Building" required><select><option>Block A</option><option>Block B</option><option>Science Block</option><option>Hostel Block</option></select></Field><Field label="Room number" required><input placeholder="e.g. A203" required /></Field><Field label="Priority" required><select><option>Medium</option><option>Low</option><option>High</option><option>Urgent</option></select></Field><Field label="Assign to"><select><option>Unassigned</option><option>Ramesh Kumar</option><option>Muthu Selvam</option><option>Arjun Prakash</option></select></Field><Field label="Description" required><textarea rows={4} placeholder="Describe the issue in detail..." required /></Field><Field label="Photo or document" hint="PNG, JPG or PDF up to 10 MB"><div className="upload-box"><Icon name="upload" /><span><b>Click to upload</b> or drag and drop</span></div></Field></div></div><div className="modal-actions"><Button variant="secondary" onClick={onClose}>Save as draft</Button><Button type="submit">Submit request</Button></div></form></Modal>;
}

function FacilityModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  return <Modal title="Add facility" subtitle="Register a new campus building, room, or space." onClose={onClose}><form onSubmit={(e) => { e.preventDefault(); onSave(); }}><div className="modal-body"><Field label="Facility name" required><input placeholder="e.g. Robotics Laboratory" required /></Field><div className="form-grid"><Field label="Building" required><input placeholder="e.g. Block D" required /></Field><Field label="Room number"><input placeholder="e.g. D204" /></Field><Field label="Facility type" required><select><option>Classroom</option><option>Laboratory</option><option>Hostel</option><option>Office</option><option>Restroom</option><option>Other</option></select></Field><Field label="Condition"><select><option>Good</option><option>Needs Repair</option><option>Under Maintenance</option></select></Field></div></div><div className="modal-actions"><Button variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit">Add facility</Button></div></form></Modal>;
}

function StudentDetail({ onClose }: { onClose: () => void }) {
  return <Modal title="Student profile" subtitle="Complete academic and contact information." onClose={onClose}><div className="modal-body"><div className="detail-profile"><Avatar initials="AR" large /><div><strong>Ananya Raman</strong><span>CCS24018 · Active student</span></div><Badge tone="active">Active</Badge></div><div className="detail-grid"><div><span>Department</span><strong>Computer Science</strong></div><div><span>Course</span><strong>B.Sc Computer Science</strong></div><div><span>Year of study</span><strong>III Year</strong></div><div><span>Admission year</span><strong>2022</strong></div><div><span>Email</span><strong>ananya.r@campus.edu</strong></div><div><span>Phone</span><strong>+91 98765 41230</strong></div></div></div><div className="modal-actions"><Button variant="secondary" onClick={onClose}>Close</Button><Button icon="edit">Edit profile</Button></div></Modal>;
}

function RequestDetail({ onClose, notify }: { onClose: () => void; notify: (m: string) => void }) {
  return <Modal title="MNT-2048 · Ceiling fan not working" subtitle="Reported on 24 May, 2025 at 09:42 AM" onClose={onClose} wide><div className="modal-body"><div className="request-detail-top"><div><span>Location</span><strong>Block A · Room A203</strong></div><div><span>Category</span><strong>Electrical</strong></div><div><span>Priority</span><Badge>High</Badge></div><div><span>Status</span><Badge>In Progress</Badge></div></div><div className="request-detail-grid"><div><div className="detail-section"><strong>Issue description</strong><p>The ceiling fan above the third row has stopped working and makes a clicking sound when switched on. Please inspect the wiring and motor.</p></div><div className="detail-section"><strong>Assignment</strong><div className="assignee"><Avatar initials="RK" /><span><b>Ramesh Kumar</b><small>Electrical Technician</small></span><Button variant="secondary">Reassign</Button></div></div></div><div className="timeline"><strong>Status timeline</strong>{[["Request submitted", "Ananya Raman · 24 May, 09:42 AM", true], ["Assigned to Ramesh Kumar", "Dr. Kavitha Rao · 24 May, 10:15 AM", true], ["Work in progress", "Ramesh Kumar · 24 May, 01:30 PM", true], ["Issue resolved", "Awaiting completion", false]].map(x => <div className={x[2] ? "done" : ""} key={x[0]}><i>{x[2] && <Icon name="check" size={12} />}</i><span><b>{x[0]}</b><small>{x[1]}</small></span></div>)}</div></div></div><div className="modal-actions"><select aria-label="Update status"><option>In Progress</option><option>Resolved</option><option>Rejected</option></select><Button onClick={() => { notify("Request status updated"); onClose(); }}>Update status</Button></div></Modal>;
}

function ConfirmModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return <Modal title="Deactivate staff account?" subtitle="This action will revoke access to CampusCare." onClose={onClose}><div className="modal-body"><div className="confirm-content"><span><Icon name="trash" /></span><p>The staff profile and historical assignments will be retained. You can reactivate the account later.</p></div></div><div className="modal-actions"><Button variant="secondary" onClick={onClose}>Cancel</Button><Button variant="danger" onClick={onConfirm}>Deactivate account</Button></div></Modal>;
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [role, setRole] = useState("Admin");
  return <div className="login-page"><div className="login-visual"><div className="login-brand"><Logo /><div><strong>CampusCare</strong><span>College Maintenance & Record Management</span></div></div><div className="login-message"><span>SMARTER CAMPUS OPERATIONS</span><strong>Everything your campus needs, in one place.</strong><p>Connect people, facilities, and maintenance workflows with a modern management system built for higher education.</p></div><div className="login-metrics"><div><b>2,847</b><span>Students managed</span></div><div><b>98.2%</b><span>Requests resolved</span></div><div><b>48</b><span>Campus facilities</span></div></div></div><div className="login-panel"><form onSubmit={(e) => { e.preventDefault(); onLogin(); }}><div className="mobile-login-brand"><Logo /><strong>CampusCare</strong></div><div className="login-heading"><span>WELCOME BACK</span><strong>Sign in to CampusCare</strong><p>Enter your credentials to access your workspace.</p></div><div className="role-picker">{["Admin", "Staff", "Student"].map(r => <button type="button" className={role === r ? "active" : ""} onClick={() => setRole(r)} key={r}>{r}</button>)}</div><Field label="Email address"><div className="input-icon"><Icon name="mail" /><input type="email" defaultValue="admin@campus.edu" required /></div></Field><Field label="Password"><div className="input-icon"><Icon name="lock" /><input type="password" defaultValue="campuscare" required /></div></Field><div className="login-options"><label><input type="checkbox" defaultChecked />Remember me</label><button type="button">Forgot password?</button></div><Button type="submit" className="login-button">Sign in to dashboard <Icon name="arrow" /></Button><p className="login-help">Need help? Contact <b>campus IT support</b></p></form></div></div>;
}

export default App;
