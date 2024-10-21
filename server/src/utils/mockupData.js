export const mockUsers = [
  { id: 1, email: "john.doe@example.com", password: "hashedpassword123", role: "admin", createdAt: "2024-10-01T10:00:00Z", updatedAt: "2024-10-10T10:00:00Z" },
  { id: 2, email: "jane.smith@example.com", password: "hashedpassword456", role: "user", createdAt: "2024-10-05T12:00:00Z", updatedAt: "2024-10-15T12:00:00Z" },
  { id: 3, email: "alice.jones@example.com", password: "hashedpassword789", role: "user", createdAt: "2024-09-15T08:00:00Z", updatedAt: "2024-10-12T08:00:00Z" },
  { id: 4, email: "bob.brown@example.com", password: "hashedpassword012", role: "admin", createdAt: "2024-08-20T09:00:00Z", updatedAt: "2024-10-18T09:00:00Z" },
  { id: 5, email: "carol.white@example.com", password: "hashedpassword345", role: "user", createdAt: "2024-07-25T11:00:00Z", updatedAt: "2024-10-19T11:00:00Z" },
  { id: 6, email: "dave.green@example.com", password: "hashedpassword678", role: "user", createdAt: "2024-06-30T07:00:00Z", updatedAt: "2024-10-17T07:00:00Z" },
  { id: 7, email: "eve.black@example.com", password: "hashedpassword901", role: "admin", createdAt: "2024-05-15T06:00:00Z", updatedAt: "2024-10-16T06:00:00Z" },
  { id: 8, email: "frank.gray@example.com", password: "hashedpassword234", role: "user", createdAt: "2024-04-10T05:00:00Z", updatedAt: "2024-10-14T05:00:00Z" },
  { id: 9, email: "grace.blue@example.com", password: "hashedpassword567", role: "user", createdAt: "2024-03-05T04:00:00Z", updatedAt: "2024-10-13T04:00:00Z" },
  { id: 10, email: "henry.red@example.com", password: "hashedpassword890", role: "admin", createdAt: "2024-02-01T03:00:00Z", updatedAt: "2024-10-11T03:00:00Z" },
];

export const mockEquipment = [
  { id: 1, marca: "BrandA", modelo: "ModelX", serial: "12345", tipo_equipo: "Laptop", caracteristicas: "16GB RAM, 512GB SSD", software: "Windows 10", nombre_equipo: "Office Laptop", departamento_id: 1, fecha_adquisicion: "2024-01-15T00:00:00Z", estado: "active", usuario_id: 1, fecha_ultima_actividad: "2024-10-20T10:00:00Z" },
  { id: 2, marca: "BrandB", modelo: "ModelY", serial: "67890", tipo_equipo: "Desktop", caracteristicas: "32GB RAM, 1TB SSD", software: "Ubuntu 20.04", nombre_equipo: "Development PC", departamento_id: 2, fecha_adquisicion: "2023-06-10T00:00:00Z", estado: "inactive", usuario_id: 2, fecha_ultima_actividad: "2024-09-15T10:00:00Z" },
  { id: 3, marca: "BrandC", modelo: "ModelZ", serial: "54321", tipo_equipo: "Tablet", caracteristicas: "8GB RAM, 256GB SSD", software: "iOS", nombre_equipo: "Design Tablet", departamento_id: 3, fecha_adquisicion: "2024-02-20T00:00:00Z", estado: "active", usuario_id: 3, fecha_ultima_actividad: "2024-10-18T10:00:00Z" },
  { id: 4, marca: "BrandD", modelo: "ModelW", serial: "09876", tipo_equipo: "Smartphone", caracteristicas: "4GB RAM, 128GB SSD", software: "Android", nombre_equipo: "Work Phone", departamento_id: 4, fecha_adquisicion: "2024-03-25T00:00:00Z", estado: "active", usuario_id: 4, fecha_ultima_actividad: "2024-10-17T10:00:00Z" },
  { id: 5, marca: "BrandE", modelo: "ModelV", serial: "11223", tipo_equipo: "Printer", caracteristicas: "Laser, Color", software: "Firmware 1.0", nombre_equipo: "Office Printer", departamento_id: 5, fecha_adquisicion: "2024-04-30T00:00:00Z", estado: "active", usuario_id: 5, fecha_ultima_actividad: "2024-10-16T10:00:00Z" },
  { id: 6, marca: "BrandF", modelo: "ModelU", serial: "44556", tipo_equipo: "Router", caracteristicas: "Dual Band", software: "Firmware 2.0", nombre_equipo: "Office Router", departamento_id: 6, fecha_adquisicion: "2024-05-05T00:00:00Z", estado: "active", usuario_id: 6, fecha_ultima_actividad: "2024-10-15T10:00:00Z" },
  { id: 7, marca: "BrandG", modelo: "ModelT", serial: "77889", tipo_equipo: "Monitor", caracteristicas: "27 inch, 4K", software: "None", nombre_equipo: "Design Monitor", departamento_id: 7, fecha_adquisicion: "2024-06-10T00:00:00Z", estado: "active", usuario_id: 7, fecha_ultima_actividad: "2024-10-14T10:00:00Z" },
  { id: 8, marca: "BrandH", modelo: "ModelS", serial: "99001", tipo_equipo: "Keyboard", caracteristicas: "Mechanical", software: "None", nombre_equipo: "Office Keyboard", departamento_id: 8, fecha_adquisicion: "2024-07-15T00:00:00Z", estado: "active", usuario_id: 8, fecha_ultima_actividad: "2024-10-13T10:00:00Z" },
  { id: 9, marca: "BrandI", modelo: "ModelR", serial: "22334", tipo_equipo: "Mouse", caracteristicas: "Wireless", software: "None", nombre_equipo: "Office Mouse", departamento_id: 9, fecha_adquisicion: "2024-08-20T00:00:00Z", estado: "active", usuario_id: 9, fecha_ultima_actividad: "2024-10-12T10:00:00Z" },
  { id: 10, marca: "BrandJ", modelo: "ModelQ", serial: "55667", tipo_equipo: "Projector", caracteristicas: "1080p", software: "Firmware 3.0", nombre_equipo: "Conference Projector", departamento_id: 10, fecha_adquisicion: "2024-09-25T00:00:00Z", estado: "active", usuario_id: 10, fecha_ultima_actividad: "2024-10-11T10:00:00Z" },
];
export const mockDepartments = [
  { id: 1, name: "IT", location: "Building A" },
  { id: 2, name: "HR", location: "Building B" },
  { id: 3, name: "Finance", location: "Building C" },
  { id: 4, name: "Marketing", location: "Building D" },
  { id: 5, name: "Sales", location: "Building E" },
  { id: 6, name: "Operations", location: "Building F" },
  { id: 7, name: "Legal", location: "Building G" },
  { id: 8, name: "R&D", location: "Building H" },
  { id: 9, name: "Customer Service", location: "Building I" },
  { id: 10, name: "Logistics", location: "Building J" },
];
