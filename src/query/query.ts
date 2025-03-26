export const addProductQuery = `
    INSERT INTO products (
        name, description, price, category, stock_quantity, image_url, created_at, updated_at
    )
    VALUES (:name, :description, :price, :category, :stock_quantity, :image_url, NOW(), NOW())
    RETURNING product_id;
`;

export const updateProductQuery = `
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

export const deleteProductQuery = `
    DELETE FROM products
    WHERE product_id = :product_id
    RETURNING *;
`;

export const getProductByIdQuery = `
    SELECT * 
    FROM products 
    WHERE product_id = :product_id;
`;

export const getAllProductsQuery = `
    SELECT * 
    FROM products;
`;

export const getProductsByCategoryQuery = `
    SELECT * 
    FROM products 
    WHERE category = :category;
`;

export const registerUserQuery = `
    INSERT INTO users (
        email, password_hash, username, first_name, last_name, role, created_at
    )
    VALUES (:email, :password_hash, :username, :first_name, :last_name, :role, NOW())
    RETURNING user_id;
`;

export const isEmailExistsQuery = `
    SELECT EXISTS(SELECT 1 FROM users WHERE email = :email) AS email_exists;
`;

export const isUsernameExistsQuery = `
    SELECT EXISTS(SELECT 1 FROM users WHERE username = :username) AS username_exists;
`;

export const getUserByIdQuery = `
    SELECT * 
    FROM users 
    WHERE user_id = :user_id;
`;

export const getUserByEmailQuery = `
    SELECT * 
    FROM users 
    WHERE email = :email;
`;

export const updateUserQuery = `
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

export const deleteUserQuery = `
    DELETE FROM users
    WHERE user_id = :user_id;
`;

export const addOrderQuery = `
    INSERT INTO orders (
        user_id, total_amount, status, created_at, updated_at
    )
    VALUES (:user_id, :total_amount, :status, NOW(), NOW())
    RETURNING order_id;
`;

export const addOrderDetailQuery = `
    INSERT INTO order_details (
        order_id, product_id, quantity, price
    )
    VALUES (:order_id, :product_id, :quantity, :price)
    RETURNING order_detail_id;
`;

export const getOrderByIdQuery = `
    SELECT * 
    FROM orders 
    WHERE order_id = :order_id;
`;

export const getOrderDetailsQuery = `
    SELECT * 
    FROM order_details 
    WHERE order_id = :order_id;
`;

export const getOrdersByUserIdQuery = `
    SELECT * 
    FROM orders 
    WHERE user_id = :user_id;
`;

export const addQuoteQuery = `
    INSERT INTO quotes (
        user_id, event_type, event_date, description, status, created_at, updated_at
    )
    VALUES (:user_id, :event_type, :event_date, :description, :status, NOW(), NOW())
    RETURNING quote_id;
`;

export const getQuoteByIdQuery = `
    SELECT * 
    FROM quotes 
    WHERE quote_id = :quote_id;
`;

export const getQuotesByUserIdQuery = `
    SELECT * 
    FROM quotes 
    WHERE user_id = :user_id;
`;

export const addBlogPostQuery = `
    INSERT INTO blog_posts (
        title, content, author_id, image_url, created_at, updated_at
    )
    VALUES (:title, :content, :author_id, :image_url, NOW(), NOW())
    RETURNING post_id;
`;

export const getBlogPostByIdQuery = `
    SELECT * 
    FROM blog_posts 
    WHERE post_id = :post_id;
`;

export const getAllBlogPostsQuery = `
    SELECT * 
    FROM blog_posts;
`;

export const addCommentQuery = `
    INSERT INTO comments (
        post_id, user_id, content, created_at
    )
    VALUES (:post_id, :user_id, :content, NOW())
    RETURNING comment_id;
`;

export const getCommentsByPostIdQuery = `
    SELECT * 
    FROM comments 
    WHERE post_id = :post_id;
`;

export const assignUserRoleQuery = `
    INSERT INTO user_roles (
        user_id, role_id
    )
    VALUES (:user_id, :role_id)
    RETURNING *;
`;

export const getRolesByUserIdQuery = `
    SELECT * 
    FROM user_roles 
    WHERE user_id = :user_id;
`;

export const registerUserProfileQuery = `
    INSERT INTO user_profiles (
        user_id, bio, profile_picture, phone_number, address
    )
    VALUES (:user_id, :bio, :profile_picture, :phone_number, :address)
    RETURNING *;
`;

export const getUserProfileQuery = `
    SELECT * 
    FROM user_profiles 
    WHERE user_id = :user_id;
`;