# TEG
Proyecto presentado para nuestro Trabajo Especial de Grado


CREATE TABLE ordenes_compra (
  id_orden_compra SERIAL PRIMARY KEY,
  id_usuario INTEGER NOT NULL REFERENCES usuarios (id),
  fecha_compra TIMESTAMP NOT NULL,
  productos JSONB NOT NULL,
  estado VARCHAR(255) NOT NULL
);
SELECT * FROM carrito_items;
SELECT * FROM ordenes_compra;