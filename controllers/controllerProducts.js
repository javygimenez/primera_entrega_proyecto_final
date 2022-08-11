import Container from '../controllers/container.js';

const products = new Container('./data/products.json');

// ADMIN
class Admin { 
		static isLogin() {
	  	return true
	}  
}

//Get all products or product selected
const getProducts = (req, res) => {
	if (req.params.id == undefined) return res.send(products.getAll());
	const id = Number(req.params.id);
	const product = products.getById(id);
	if (!product) return res.status(404).send({ message: 'El ID no pertenece a un producto listado' });
	res.json(product);
}

//Add product
const addProduct = (req, res) => {
	let login = Admin.isLogin()
	if (login ) {
		const { name, description, code, pic, price, stock } = req.body;
		products.save({ name, description, code, pic, price, stock });
		res.json({ message: 'Producto agregado' });
	} else {
		res.json({ error : -1, descripcion: "ruta '/' método 'POST' no autorizada" })
	}	
}

//Update product
const updateProduct = (req, res) => {
	let login = Admin.isLogin()
	if (login) {
		const id = Number(req.params.id);
		if (id < 0 || id > products.objects.length) return res.status(400).send({ message: 'Ingresa el ID de un producto listado' });
		if (isNaN(id)) return res.status(400).send({ message: 'Ingresa el ID de un producto listado' });
		products.update(id, req.body);
		res.json({ message: 'Producto actualizado' });
	} else {
		res.json({ error : -1, descripcion: `ruta '/${id}' método 'PUT' no autorizada` })
	}	
};

//Delete product
const deleteProduct = (req, res) => {
	let login = Admin.isLogin()
	if (login) {
		const id = Number(req.params.id);
		if (isNaN(id)) return res.status(400).send({ message: 'Ingresa el ID de un producto listado' });
		const productDeleted = products.deleteById(id);
		if (productDeleted === -1) return res.status(404).json({ message: 'El ID no pertenece a un producto listado' });
		res.json({ message: 'Producto eliminado' });
	} else {
		res.json({ error : -1, descripcion: `ruta '/${id}' método 'DELETE' no autorizada` })
	}	
};

export { products, getProducts, addProduct, updateProduct, deleteProduct };