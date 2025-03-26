"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfileQuery = exports.registerUserProfileQuery = exports.getRolesByUserIdQuery = exports.assignUserRoleQuery = exports.getCommentsByPostIdQuery = exports.addCommentQuery = exports.getAllBlogPostsQuery = exports.getBlogPostByIdQuery = exports.addBlogPostQuery = exports.getQuotesByUserIdQuery = exports.getQuoteByIdQuery = exports.addQuoteQuery = exports.getOrdersByUserIdQuery = exports.getOrderDetailsQuery = exports.getOrderByIdQuery = exports.addOrderDetailQuery = exports.addOrderQuery = exports.deleteUserQuery = exports.updateUserQuery = exports.getUserByEmailQuery = exports.getUserByIdQuery = exports.isUsernameExistsQuery = exports.isEmailExistsQuery = exports.registerUserQuery = exports.getProductsByCategoryQuery = exports.getAllProductsQuery = exports.getProductByIdQuery = exports.deleteProductQuery = exports.updateProductQuery = exports.addProductQuery = void 0;
exports.addProductQuery = `
    INSERT INTO products (
        name, description, price, category, stock_quantity, image_url, created_at, updated_at
    )
    VALUES (:name, :description, :price, :category, :stock_quantity, :image_url, NOW(), NOW())
    RETURNING product_id;
`;
exports.updateProductQuery = `
    UPDATE products
    SET 
        name = :name,
        description = :description,
        price = :price,
        category = :category,
        stock_quantity = :stock_quantity,
        image_url = :image_url,
        updated_at = NOW()
    WHERE product_id = :product_id
    RETURNING *;
`;
exports.deleteProductQuery = `
    DELETE FROM products
    WHERE product_id = :product_id
    RETURNING *;
`;
exports.getProductByIdQuery = `
    SELECT * 
    FROM products 
    WHERE product_id = :product_id;
`;
exports.getAllProductsQuery = `
    SELECT * 
    FROM products;
`;
exports.getProductsByCategoryQuery = `
    SELECT * 
    FROM products 
    WHERE category = :category;
`;
exports.registerUserQuery = `
    INSERT INTO users (
        email, password_hash, username, first_name, last_name, role, created_at
    )
    VALUES (:email, :password_hash, :username, :first_name, :last_name, :role, NOW())
    RETURNING user_id;
`;
exports.isEmailExistsQuery = `
    SELECT EXISTS(SELECT 1 FROM users WHERE email = :email) AS email_exists;
`;
exports.isUsernameExistsQuery = `
    SELECT EXISTS(SELECT 1 FROM users WHERE username = :username) AS username_exists;
`;
exports.getUserByIdQuery = `
    SELECT * 
    FROM users 
    WHERE user_id = :user_id;
`;
exports.getUserByEmailQuery = `
    SELECT * 
    FROM users 
    WHERE email = :email;
`;
exports.updateUserQuery = `
    UPDATE users
    SET 
        email = :email,
        password_hash = :password_hash,
        username = :username,
        first_name = :first_name,
        last_name = :last_name,
        role = :role,
        updated_at = NOW()
    WHERE user_id = :user_id;
`;
exports.deleteUserQuery = `
    DELETE FROM users
    WHERE user_id = :user_id;
`;
exports.addOrderQuery = `
    INSERT INTO orders (
        user_id, total_amount, status, created_at, updated_at
    )
    VALUES (:user_id, :total_amount, :status, NOW(), NOW())
    RETURNING order_id;
`;
exports.addOrderDetailQuery = `
    INSERT INTO order_details (
        order_id, product_id, quantity, price
    )
    VALUES (:order_id, :product_id, :quantity, :price)
    RETURNING order_detail_id;
`;
exports.getOrderByIdQuery = `
    SELECT * 
    FROM orders 
    WHERE order_id = :order_id;
`;
exports.getOrderDetailsQuery = `
    SELECT * 
    FROM order_details 
    WHERE order_id = :order_id;
`;
exports.getOrdersByUserIdQuery = `
    SELECT * 
    FROM orders 
    WHERE user_id = :user_id;
`;
exports.addQuoteQuery = `
    INSERT INTO quotes (
        user_id, event_type, event_date, description, status, created_at, updated_at
    )
    VALUES (:user_id, :event_type, :event_date, :description, :status, NOW(), NOW())
    RETURNING quote_id;
`;
exports.getQuoteByIdQuery = `
    SELECT * 
    FROM quotes 
    WHERE quote_id = :quote_id;
`;
exports.getQuotesByUserIdQuery = `
    SELECT * 
    FROM quotes 
    WHERE user_id = :user_id;
`;
exports.addBlogPostQuery = `
    INSERT INTO blog_posts (
        title, content, author_id, image_url, created_at, updated_at
    )
    VALUES (:title, :content, :author_id, :image_url, NOW(), NOW())
    RETURNING post_id;
`;
exports.getBlogPostByIdQuery = `
    SELECT * 
    FROM blog_posts 
    WHERE post_id = :post_id;
`;
exports.getAllBlogPostsQuery = `
    SELECT * 
    FROM blog_posts;
`;
exports.addCommentQuery = `
    INSERT INTO comments (
        post_id, user_id, content, created_at
    )
    VALUES (:post_id, :user_id, :content, NOW())
    RETURNING comment_id;
`;
exports.getCommentsByPostIdQuery = `
    SELECT * 
    FROM comments 
    WHERE post_id = :post_id;
`;
exports.assignUserRoleQuery = `
    INSERT INTO user_roles (
        user_id, role_id
    )
    VALUES (:user_id, :role_id)
    RETURNING *;
`;
exports.getRolesByUserIdQuery = `
    SELECT * 
    FROM user_roles 
    WHERE user_id = :user_id;
`;
exports.registerUserProfileQuery = `
    INSERT INTO user_profiles (
        user_id, bio, profile_picture, phone_number, address
    )
    VALUES (:user_id, :bio, :profile_picture, :phone_number, :address)
    RETURNING *;
`;
exports.getUserProfileQuery = `
    SELECT * 
    FROM user_profiles 
    WHERE user_id = :user_id;
`;
