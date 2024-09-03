const Customer = require('../models/customerSchema.js');
const { hashPassword, comparePassword, generateToken } = require('../utils/index.js');

const findCustomerByEmail = async (email) => {
    return Customer.findOne({ email });
};

const findCustomerById = async (id) => {
    return Customer.findById(id);
};

// Register a new customer
const customerRegister = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingCustomer = await findCustomerByEmail(email);

        if (existingCustomer) {
            return res.status(400).send({ message: 'Email already exists' });
        }

        const hashedPass = await hashPassword(password);
        const customer = new Customer({ ...req.body, password: hashedPass });

        const result = await customer.save();
        result.password = undefined;

        const token = generateToken(result._id);
        res.send({ ...result._doc, token });
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err });
    }
};

// Log in a customer
const customerLogIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: "Email and password are required" });
        }

        const customer = await findCustomerByEmail(email);

        if (!customer) {
            return res.status(404).send({ message: "User not found" });
        }

        const isValid = await comparePassword(password, customer.password);
        if (!isValid) {
            return res.status(400).send({ message: "Invalid password" });
        }

        customer.password = undefined;
        const token = generateToken(customer._id);
        res.send({ ...customer._doc, token });
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err });
    }
};

// Get cart details for a customer
const getCartDetail = async (req, res) => {
    try {
        const customer = await findCustomerById(req.params.id);

        if (!customer) {
            return res.status(404).send({ message: "No customer found" });
        }

        res.send(customer.cartDetails);
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err });
    }
};

// Update cart details for a customer
const cartUpdate = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!customer) {
            return res.status(404).send({ message: "No customer found" });
        }

        res.send(customer.cartDetails);
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err });
    }
};

// Update customer password
const updateCustomerPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;

        const customer = await findCustomerById(id);
        if (!customer) {
            return res.status(404).send({ message: 'User not found' });
        }

        const isValid = await comparePassword(currentPassword, customer.password);
        if (!isValid) {
            return res.status(400).send({ message: 'Invalid current password' });
        }

        customer.password = await hashPassword(newPassword);
        await customer.save();

        res.status(200).send({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err });
    }
};

module.exports = {
    customerRegister,
    customerLogIn,
    getCartDetail,
    cartUpdate,
    updateCustomerPassword,
};
