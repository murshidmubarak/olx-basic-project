import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';

export const createProduct = async (req, res) => {
  try {
    // Check for image
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    // Upload to Cloudinary from memory
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'olx-products',
    });

    // Create product
    const product = await Product.create({
      title: req.body.title,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      location: req.body.location,
      image: result.secure_url,
      imagePublicId: result.public_id,
      user: req.user.id,
    });

    res.status(201).json({ 
      success: true, 
      message: 'Product created successfully', 
      product 
    });
  } catch (error) {
    console.error('Product creation error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('user', 'name email').sort('-createdAt');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {

  try {

    const product = await Product
      .findById(req.params.id)
      .populate('user', 'name email');

    if (!product) {

      return res.status(404).json({
        message: 'Product not found',
      });

    }

    res.json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};





// Get logged user products
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      user: req.user.id,
    }).sort('-createdAt');

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const updateProduct = async (req, res) => {
try {

const product = await Product.findById(
  req.params.id
);

if (!product) {
  return res.status(404).json({
    message: 'Product not found',
  });
}

if (
  product.user.toString() !==
  req.user.id
) {
  return res.status(401).json({
    message: 'Not authorized',
  });
}

product.title =
  req.body.title || product.title;

product.category =
  req.body.category || product.category;

product.price =
  req.body.price || product.price;

product.description =
  req.body.description ||
  product.description;

product.location =
  req.body.location ||
  product.location;

if (req.file) {

  if (product.imagePublicId) {

    await cloudinary.uploader.destroy(
      product.imagePublicId
    );

  }

  const b64 = Buffer.from(
    req.file.buffer
  ).toString('base64');

  const dataURI =
    `data:${req.file.mimetype};base64,${b64}`;

  const result =
    await cloudinary.uploader.upload(
      dataURI,
      {
        folder: 'olx-products',
      }
    );

  product.image =
    result.secure_url;

  product.imagePublicId =
    result.public_id;
}

const updated =
  await product.save();

res.json(updated);

} catch (error) {

res.status(500).json({
  message: error.message,
});


}
};


// Delete product
export const deleteProduct = async (req,res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    if (product.user.toString() !==req.user.id) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    if (product.imagePublicId) {

  await cloudinary.uploader.destroy(
    product.imagePublicId
  );

}

await product.deleteOne();


    res.json({
      message: 'Product deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};