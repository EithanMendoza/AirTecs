CREATE DATABASE integradora
Use integradora

CREATE TABLE usuarios (
    id bigint primary key AUTO_INCREMENT,
    username varchar(255) not null unique,
    email varchar(255) not null unique,
    password varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE login (
    id bigint primary key AUTO_INCREMENT,
    user_id bigint not null,
    tiempo_inicio timestamp default current_timestamp,
    tiempo_cierre timestamp,
    session_token varchar(255) not null unique,
    FOREIGN KEY (user_id) REFERENCES usuarios(id)
);

ALTER TABLE login ADD UNIQUE (user_id);


CREATE TABLE tipos_servicio (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre_servicio VARCHAR(255) NOT NULL,
    descripcion TEXT,
    imagenUrl VARCHAR(255)  -- Incluye la columna en la creación de la tabla
);

INSERT INTO tipos_servicio (nombre_servicio, descripcion, imagenUrl) VALUES
('Mantenimiento de aires acondicionados', 'Servicio de mantenimiento preventivo y correctivo de aires acondicionados', 'https://st5.depositphotos.com/62628780/63430/i/450/depositphotos_634302062-stock-photo-air-conditioning-technician-engineer-roof.jpg'),
('Reparación de aires acondicionados', 'Servicio de reparación de aires acondicionados', 'https://www.davofrio.com/wp-content/uploads/2021/08/mantenimiento-de-aire-acondicionado.png'),
('Limpieza de refrigeradores', 'Servicio de limpieza profesional para refrigeradores', 'https://aprende.com/wp-content/uploads/2022/09/cuales-son-las-posibles-fallas-de-un-refrigerador-que-no-enfria.jpg'),
('Reparación de refrigeradores', 'Servicio de reparación para refrigeradores', 'https://electro.homewashperu.com/wp-content/uploads/2019/07/refri-02.jpg');


CREATE TABLE servicios (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    user_name VARCHAR(255) NOT NULL, -- Agregamos el nombre del usuario
    tipo_servicio_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES usuarios(id),
    FOREIGN KEY (tipo_servicio_id) REFERENCES tipos_servicio(id)
);

CREATE TABLE opciones_ac (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    tipo_opcion ENUM('marca', 'tipo_ac') NOT NULL,
    valor_opcion VARCHAR(255) NOT NULL
);
INSERT INTO opciones_ac (tipo_opcion, valor_opcion) VALUES
('marca', 'Mirage'),
('marca', 'Mabe'),
('marca', 'Carrier'),
('marca', 'LG'),
('marca', 'Samsung'),
('marca', 'Daikin'),
('marca', 'Panasonic'),
('marca', 'Whirlpool'),
('marca', 'York'),
('marca', 'Trane');

INSERT INTO opciones_ac (tipo_opcion, valor_opcion) VALUES
('tipo_ac', 'mini split'),
('tipo_ac', 'Ventana');

CREATE TABLE solicitudes_servicio (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    tipo_servicio_id BIGINT NOT NULL,
    nombre_servicio VARCHAR(100) NOT NULL,
    marca_ac VARCHAR(255) NOT NULL,
    tipo_ac VARCHAR(50) NOT NULL,
    detalles TEXT,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    estado VARCHAR(50) DEFAULT 'pendiente',  -- Estado de la solicitud (por defecto 'pendiente')
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuarios(id),
    FOREIGN KEY (tipo_servicio_id) REFERENCES tipos_servicio(id)
);

CREATE TABLE tecnicos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100) NOT NULL,  -- Especialidad del técnico (ej: aire acondicionado, refrigeradores)
    disponibilidad BOOLEAN DEFAULT TRUE  -- TRUE si está disponible para asignación
);

-- Insertar 10 técnicos con nombres realistas
INSERT INTO tecnicos (nombre, especialidad, disponibilidad) VALUES
('Juan Pérez', 'Aire Acondicionado', TRUE),
('María Gómez', 'Refrigeradores', TRUE),
('Carlos Ramírez', 'Aire Acondicionado', TRUE),
('Sofía Hernández', 'Refrigeradores', TRUE),
('Luis Morales', 'Aire Acondicionado', TRUE),
('Ana Sánchez', 'Refrigeradores', TRUE),
('Miguel Torres', 'Aire Acondicionado', TRUE),
('Laura Ruiz', 'Refrigeradores', TRUE),
('José Martínez', 'Aire Acondicionado', TRUE),
('Diana Fernández', 'Refrigeradores', TRUE);

INSERT INTO tecnicos (nombre, especialidad, disponibilidad) VALUES
('Técnico 1', 'Aire Acondicionado', TRUE),
('Técnico 2', 'Refrigeradores', TRUE),
('Técnico 3', 'Aire Acondicionado', TRUE),
('Técnico 4', 'Refrigeradores', TRUE),
('Técnico 5', 'Aire Acondicionado', TRUE),
('Técnico 6', 'Refrigeradores', TRUE),
('Técnico 7', 'Aire Acondicionado', TRUE),
('Técnico 8', 'Refrigeradores', TRUE),
('Técnico 9', 'Aire Acondicionado', TRUE),
('Técnico 10', 'Refrigeradores', TRUE),
('Técnico 11', 'Aire Acondicionado', TRUE),
('Técnico 12', 'Refrigeradores', TRUE),
('Técnico 13', 'Aire Acondicionado', TRUE),
('Técnico 14', 'Refrigeradores', TRUE),
('Técnico 15', 'Aire Acondicionado', TRUE),
('Técnico 16', 'Refrigeradores', TRUE),
('Técnico 17', 'Aire Acondicionado', TRUE),
('Técnico 18', 'Refrigeradores', TRUE),
('Técnico 19', 'Aire Acondicionado', TRUE),
('Técnico 20', 'Refrigeradores', TRUE),
('Técnico 21', 'Aire Acondicionado', TRUE),
('Técnico 22', 'Refrigeradores', TRUE),
('Técnico 23', 'Aire Acondicionado', TRUE),
('Técnico 24', 'Refrigeradores', TRUE),
('Técnico 25', 'Aire Acondicionado', TRUE),
('Técnico 26', 'Refrigeradores', TRUE),
('Técnico 27', 'Aire Acondicionado', TRUE),
('Técnico 28', 'Refrigeradores', TRUE),
('Técnico 29', 'Aire Acondicionado', TRUE),
('Técnico 30', 'Refrigeradores', TRUE),
('Técnico 31', 'Aire Acondicionado', TRUE),
('Técnico 32', 'Refrigeradores', TRUE),
('Técnico 33', 'Aire Acondicionado', TRUE),
('Técnico 34', 'Refrigeradores', TRUE),
('Técnico 35', 'Aire Acondicionado', TRUE),
('Técnico 36', 'Refrigeradores', TRUE),
('Técnico 37', 'Aire Acondicionado', TRUE),
('Técnico 38', 'Refrigeradores', TRUE),
('Técnico 39', 'Aire Acondicionado', TRUE),
('Técnico 40', 'Refrigeradores', TRUE),
('Técnico 41', 'Aire Acondicionado', TRUE),
('Técnico 42', 'Refrigeradores', TRUE),
('Técnico 43', 'Aire Acondicionado', TRUE),
('Técnico 44', 'Refrigeradores', TRUE),
('Técnico 45', 'Aire Acondicionado', TRUE),
('Técnico 46', 'Refrigeradores', TRUE),
('Técnico 47', 'Aire Acondicionado', TRUE),
('Técnico 48', 'Refrigeradores', TRUE),
('Técnico 49', 'Aire Acondicionado', TRUE),
('Técnico 50', 'Refrigeradores', TRUE),
('Técnico 51', 'Aire Acondicionado', TRUE),
('Técnico 52', 'Refrigeradores', TRUE),
('Técnico 53', 'Aire Acondicionado', TRUE),
('Técnico 54', 'Refrigeradores', TRUE),
('Técnico 55', 'Aire Acondicionado', TRUE),
('Técnico 56', 'Refrigeradores', TRUE),
('Técnico 57', 'Aire Acondicionado', TRUE),
('Técnico 58', 'Refrigeradores', TRUE),
('Técnico 59', 'Aire Acondicionado', TRUE),
('Técnico 60', 'Refrigeradores', TRUE),
('Técnico 61', 'Aire Acondicionado', TRUE),
('Técnico 62', 'Refrigeradores', TRUE),
('Técnico 63', 'Aire Acondicionado', TRUE),
('Técnico 64', 'Refrigeradores', TRUE),
('Técnico 65', 'Aire Acondicionado', TRUE),
('Técnico 66', 'Refrigeradores', TRUE),
('Técnico 67', 'Aire Acondicionado', TRUE),
('Técnico 68', 'Refrigeradores', TRUE),
('Técnico 69', 'Aire Acondicionado', TRUE),
('Técnico 70', 'Refrigeradores', TRUE),
('Técnico 71', 'Aire Acondicionado', TRUE),
('Técnico 72', 'Refrigeradores', TRUE),
('Técnico 73', 'Aire Acondicionado', TRUE),
('Técnico 74', 'Refrigeradores', TRUE),
('Técnico 75', 'Aire Acondicionado', TRUE),
('Técnico 76', 'Refrigeradores', TRUE),
('Técnico 77', 'Aire Acondicionado', TRUE),
('Técnico 78', 'Refrigeradores', TRUE),
('Técnico 79', 'Aire Acondicionado', TRUE),
('Técnico 80', 'Refrigeradores', TRUE),
('Técnico 81', 'Aire Acondicionado', TRUE),
('Técnico 82', 'Refrigeradores', TRUE),
('Técnico 83', 'Aire Acondicionado', TRUE),
('Técnico 84', 'Refrigeradores', TRUE),
('Técnico 85', 'Aire Acondicionado', TRUE),
('Técnico 86', 'Refrigeradores', TRUE),
('Técnico 87', 'Aire Acondicionado', TRUE),
('Técnico 88', 'Refrigeradores', TRUE),
('Técnico 89', 'Aire Acondicionado', TRUE),
('Técnico 90', 'Refrigeradores', TRUE),
('Técnico 91', 'Aire Acondicionado', TRUE),
('Técnico 92', 'Refrigeradores', TRUE),
('Técnico 93', 'Aire Acondicionado', TRUE),
('Técnico 94', 'Refrigeradores', TRUE),
('Técnico 95', 'Aire Acondicionado', TRUE),
('Técnico 96', 'Refrigeradores', TRUE),
('Técnico 97', 'Aire Acondicionado', TRUE),
('Técnico 98', 'Refrigeradores', TRUE),
('Técnico 99', 'Aire Acondicionado', TRUE),
('Técnico 100', 'Refrigeradores', TRUE);


CREATE TABLE notificaciones (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    mensaje TEXT NOT NULL,
    leido BOOLEAN DEFAULT FALSE,  -- Indica si el usuario ha leído la notificación
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuarios(id)
);

CREATE TABLE tecnicos_asignados (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    solicitud_id BIGINT NOT NULL,
    tecnico_id BIGINT NOT NULL,
    tecnico_nombre VARCHAR(100) NOT NULL,  -- Nombre del técnico asignado
    cliente_nombre VARCHAR(100) NOT NULL,  -- Nombre del cliente
    asignado_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (solicitud_id) REFERENCES solicitudes_servicio(id),
    FOREIGN KEY (tecnico_id) REFERENCES tecnicos(id)
);

CREATE TABLE perfiles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    genero ENUM('Masculino', 'Femenino', 'Otro') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES login(user_id) -- Asegúrate de que este campo coincida con el tipo de id en tu tabla de login
);


CREATE TABLE servicios_en_curso (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    tecnico_asignado_id BIGINT NOT NULL,
    estado INT NOT NULL DEFAULT 1, -- 1 = Técnico asignado, 5 = Finalizado
    codigo_ilustrativo VARCHAR(6), -- Código ilustrativo para el cliente en ciertos estados
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_fin TIMESTAMP NULL,
    FOREIGN KEY (tecnico_asignado_id) REFERENCES tecnicos_asignados(id)
);


CREATE TABLE metodos_pago (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    metodo VARCHAR(50) NOT NULL, -- Ejemplo: "Tarjeta de Crédito", "PayPal", etc.
    numero_tarjeta VARCHAR(16), -- Número de tarjeta (para métodos que requieren tarjeta)
    nombre_titular VARCHAR(100), -- Nombre del titular de la tarjeta
    cvv VARCHAR(4), -- Código de seguridad de la tarjeta
    estado_pago ENUM('pendiente', 'pagado') DEFAULT 'pendiente',
    fecha_pago TIMESTAMP NULL
);




