
import express from "express";
import productController from "../controllers/productControllers.js";

const productRouter = express.Router();

productRouter.post("/registerProduct", productController.registerProduct);
productRouter.get("/allproducts", productController.getAllproducts);
productRouter.get("/equipment/:id", productController.getOneProduct);
productRouter.delete("/equipment/:id", productController.deleteOneProduct);
productRouter.patch("/equipment/:id", productController.updateproduct);

export default productRouter;
