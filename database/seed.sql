-- Dados demonstrativos para testes

-- Profiles (usuários fictícios)
INSERT INTO profiles (id, nome, username, descricao, role) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'TechStore Admin', 'techstore', 'Loja de tecnologia premium', 'user'),
('550e8400-e29b-41d4-a716-446655440002', 'Gamer Hub', 'gamerhub', 'Produtos para gamers', 'user'),
('550e8400-e29b-41d4-a716-446655440003', 'Comfort Seats', 'comfortseats', 'Cadeiras ergonômicas', 'user')
ON CONFLICT DO NOTHING;

-- Stores
INSERT INTO stores (id, user_id, nome, slug, descricao, whatsapp, instagram) VALUES
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'TechStore', 'techstore', 'Produtos de tecnologia e eletrônicos premium', '11999999999', '@techstore'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Gamer Hub', 'gamerhub', 'Tudo para seu setup gamer', '21999999999', '@gamerhub'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Comfort Seats', 'comfortseats', 'Cadeiras ergonômicas premium', '85999999999', '@comfortseats')
ON CONFLICT DO NOTHING;

-- Products
INSERT INTO products (id, store_id, nome, descricao, preco, categoria, estoque, ativo, destaque) VALUES
-- TechStore products
('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 'Headset Gamer Professional', 'Headset com som envolvente e microfone premium para gaming', 189.90, 'Gaming', 15, true, true),
('750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', 'Teclado Mecânico RGB', 'Teclado com switches mecânicos e iluminação RGB personalizável', 349.90, 'Gaming', 8, true, true),
('750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440001', 'Monitor 4K HDR', 'Monitor 27" 4K com suporte a HDR e taxa de atualização 144Hz', 1499.90, 'Eletrônicos', 3, true, true),
('750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440001', 'Webcam Full HD 1080p', 'Webcam profissional com autofoco e som cristalino', 299.90, 'Acessórios', 12, true, false),

-- GamerHub products
('750e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440002', 'Mouse Óptico Preciso', 'Mouse com DPI ajustável e design ergonômico', 79.90, 'Gaming', 25, true, false),
('750e8400-e29b-41d4-a716-446655440006', '650e8400-e29b-41d4-a716-446655440002', 'Mousepad XL Extended', 'Mousepad grande com base antiderrapante', 89.90, 'Gaming', 18, true, false),
('750e8400-e29b-41d4-a716-446655440007', '650e8400-e29b-41d4-a716-446655440002', 'Headphone Sem Fio', 'Headphone com cancelamento de ruído ativo', 259.90, 'Áudio', 10, true, false),

-- ComfortSeats products
('750e8400-e29b-41d4-a716-446655440008', '650e8400-e29b-41d4-a716-446655440003', 'Cadeira Gamer Confortável', 'Cadeira ergonômica com suporte lombar para longas sessões', 599.90, 'Móveis', 5, true, false),
('750e8400-e29b-41d4-a716-446655440009', '650e8400-e29b-41d4-a716-446655440003', 'Cadeira Executiva Premium', 'Cadeira executiva com acabamento em couro sintético', 799.90, 'Móveis', 4, true, false),
('750e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440003', 'Suporte Monitor Premium', 'Suporte ajustável para monitor com movimento 360°', 149.90, 'Acessórios', 20, true, false)
ON CONFLICT DO NOTHING;

-- Coupons (descontos)
INSERT INTO coupons (id, store_id, product_id, tipo, valor, ativo, validade) VALUES
('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', 'fixo', 20.00, true, NOW() + INTERVAL '30 days'),
('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440002', 'fixo', 50.00, true, NOW() + INTERVAL '30 days'),
('850e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440003', 'fixo', 200.00, true, NOW() + INTERVAL '30 days')
ON CONFLICT DO NOTHING;
