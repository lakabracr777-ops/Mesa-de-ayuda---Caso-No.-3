const data = require('../data/tickets');
const prioridadesValidas = ['baja', 'media', 'alta'];

function listar(req, res) {
  let resultado = data.obtenerTodos();
  const { estado, prioridad } = req.query;
  
  if (estado) resultado = resultado.filter(t => t.estado === estado);
  if (prioridad) resultado = resultado.filter(t => t.prioridad === prioridad);
  
  res.json(resultado);
}

function obtener(req, res) {
  const id = parseInt(req.params.id);
  const ticket = data.obtenerPorId(id);
  if (!ticket) return res.status(404).json({ error: 'Ticket no encontrado' });
  res.json(ticket);
}

function crear(req, res) {
  const { titulo, prioridad } = req.body;
  if (!titulo || !prioridad) {
    return res.status(400).json({ error: 'titulo y prioridad son obligatorios' });
  }
  if (!prioridadesValidas.includes(prioridad)) {
    return res.status(400).json({ error: 'prioridad debe ser baja, media o alta' });
  }
  const nuevo = data.crear({ 
    ...req.body, 
    estado: 'abierto' 
  });
  res.status(201).json(nuevo);
}

function actualizar(req, res) {
  const id = parseInt(req.params.id);
  const actualizada = data.actualizar(id, req.body);
  if (!actualizada) return res.status(404).json({ error: 'Ticket no encontrado' });
  res.json(actualizada);
}

function eliminar(req, res) {
  const id = parseInt(req.params.id);
  const exito = data.eliminar(id);
  if (!exito) return res.status(404).json({ error: 'Ticket no encontrado' });
  res.status(204).send();
}

module.exports = { listar, obtener, crear, actualizar, eliminar };