import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

const UserContext = createContext(null);
const ADMIN_IGNS = ["Paradox_94plaz", "kornio"];
const CartContext = createContext(null);

function TopBar() {
  const { userIGN } = useContext(UserContext);
  const { cartCount } = useContext(CartContext);
  const [showSupportPopup, setShowSupportPopup] = useState(false);

  const isAdmin = userIGN && ADMIN_IGNS.includes(userIGN);
  const maskedIGN = isAdmin && userIGN ? userIGN.slice(0, 4) + "*****" : userIGN;

    const copyDiscord = () => {
    const payments = JSON.parse(localStorage.getItem("payments") || "[]");
    payments.push({ ign: userIGN, items: cartItems, time: new Date().toLocaleString() });
    localStorage.setItem("payments", JSON.stringify(payments));


    navigator.clipboard.writeText("https://discord.gg/FhnYvNn39q");
    alert("Discord link copied!");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-black/60 border-b border-purple-500">
      <h2 className="text-xl font-bold">🚀 Xstream Server</h2>
      <div className="flex items-center gap-4">
              <Link
  to="/"
  className="px-4 py-2 rounded-xl font-bold
             bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600
             hover:from-pink-600 hover:to-purple-600
             transition-all duration-300 shadow-lg"
>
  Home
</Link>

        {!userIGN && (
          <Link to="/login" className="bg-purple-600 px-4 py-2 rounded-xl font-bold">
            Login
          </Link>
        )}

        {userIGN && (
          <div className="flex flex-col items-end">
            {isAdmin && <span className="text-xs text-red-400 font-bold">OWNER</span>}
            <span className="px-4 py-1 rounded-xl font-bold bg-indigo-600">👤 {maskedIGN}</span>
            <span className="text-xs text-gray-300">Player</span>
          </div>
        )}

        <Link to="/rules" className="font-bold">Rules</Link>
        <Link to="/privacy" className="font-bold">Privacy & Policy</Link>
        <Link to="/cart" className="text-lg font-bold">🛒 {cartCount}</Link>
        {isAdmin && <Link to="/owner" className="px-3 py-2 bg-red-600 rounded-xl font-bold">Owner Panel</Link>}
        <button
          onClick={() => setShowSupportPopup(true)}
          className="bg-indigo-600 px-4 py-2 rounded-xl font-bold cursor-pointer"
        >
          Support
        </button>
              {showSupportPopup && (
          <div className="fixed bottom-6 right-6 bg-black border border-purple-500 rounded-xl p-4 w-72 shadow-xl z-50">
            <p className="text-sm mb-2">Support via Discord</p>
            <div className="flex items-center gap-2">
              <input
                value="https://discord.gg/FhnYvNn39q"
                readOnly
                className="flex-1 px-2 py-1 rounded bg-gray-800 text-white text-sm"
              />
              <button
                onClick={copyDiscord}
                className="bg-indigo-600 px-3 py-1 rounded font-bold text-sm cursor-pointer"
                title="Copy Discord Link"
              >
                🤚
              </button>
            </div>
            <button
              onClick={() => setShowSupportPopup(false)}
              className="mt-3 text-xs text-gray-400"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function RulesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 mt-12">
      <div className="bg-black/60 border border-purple-500 rounded-2xl p-6">
        <h2 className="text-3xl font-bold mb-4">📜 Xstream Server Rules</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-3">
          <li>All purchases are <b>final</b> and non-refundable.</li>
          <li>Please ensure your <b>IGN</b> is correct before purchasing.</li>
          <li>All items are delivered <b>in-game</b> to the provided IGN.</li>
          <li>Delivery may take up to <b>24 hours</b> after successful payment.</li>
          <li>Abuse of bugs, glitches, or exploits is strictly prohibited.</li>
          <li>Any chargeback or fake payment will result in a <b>permanent ban</b>.</li>
          <li>The server team’s decisions are <b>final and binding</b>.</li>
        </ul>
      </div>
    </div>
  );
}

function CratesPage() {
  const { userIGN } = useContext(UserContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const buy = (name, price) => {
    if (!userIGN) return navigate("/login");
    addToCart(name, price);
    navigate("/cart");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 mt-12">
      <div className="bg-black/60 border border-purple-500 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
  <h2 className="text-3xl font-bold">🎁 Xstream Server Store</h2>
  <span className="text-xs bg-emerald-600/20 text-emerald-300 border border-emerald-500 px-3 py-1 rounded-full">Secure Payments • Fast Delivery</span>
</div>

        <h3 className="text-2xl font-bold mb-4">📦 Crates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[{ name: "Vote Crate", price: 29, keys: 5 }, { name: "Rare Crate", price: 49, keys: 5 }, { name: "Epic Crate", price: 79, keys: 10 }, { name: "Mythic Crate", price: 149, keys: 10 }].map((c, i) => (
            <div key={i} className="border border-cyan-500 rounded-xl p-5 text-center">
              <h3 className="text-xl font-bold text-cyan-400">{c.name}</h3>
              <p className="mb-2">₹{c.price}</p>
              <p className="text-sm text-gray-400 mb-1">One-time Crate</p>
              <p className="text-sm text-cyan-300 mb-3">🔑 {c.keys} Keys</p>
              <button
                onClick={() => buy(c.name, c.price)}
                className="mt-3 bg-indigo-600 px-5 py-2 rounded-xl font-bold"
              >
                Buy
              </button>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold mb-4">🎨 Cosmetics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {[{ name: "Nametag Custom Color", price: 39, desc: "Choose any custom name color" }, { name: "Body Layout", price: 69, desc: "Custom body / skin layout" }].map((c, i) => (
            <div key={i} className="border border-pink-500 rounded-xl p-5 text-center">
              <h3 className="text-xl font-bold text-pink-400">{c.name}</h3>
              <p className="mb-2">₹{c.price}</p>
              <p className="text-sm text-gray-400 mb-3">{c.desc}</p>
              <button
                onClick={() => buy(c.name, c.price)}
                className="mt-3 bg-indigo-600 px-5 py-2 rounded-xl font-bold"
              >
                Buy
              </button>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold mb-4">🛡️ Custom Armor & Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {[{ name: "Server Custom Armor & Tools", price: 159, desc: "Exclusive server-made armor & tools with custom enchantments" }].map((c, i) => (
            <div key={i} className="border border-purple-500 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold text-purple-400">{c.name}</h3>
              <p className="text-lg font-bold mb-2">₹{c.price}</p>
              <p className="text-sm text-gray-300 mb-4">{c.desc}</p>
              <button
                onClick={() => buy(c.name, c.price)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2 rounded-xl font-bold"
              >
                Buy
              </button>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold mb-4">👑 Permanent Ranks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[{ name: "VIP Rank", price: 59 }, { name: "MVP Rank", price: 99 }, { name: "ELITE Rank", price: 129 }, { name: "LEGEND Rank", price: 299 }].map((r, i) => (
            <div key={i} className="border border-emerald-500 rounded-xl p-5 text-center">
              <h3 className="text-xl font-bold text-emerald-400">{r.name}</h3>
              <p className="mb-2">₹{r.price}</p>
              <p className="text-sm text-gray-400 mb-3">Permanent Rank</p>
              <button
                onClick={() => buy(r.name, r.price)}
                className="mt-3 bg-indigo-600 px-5 py-2 rounded-xl font-bold"
              >
                Buy
              </button>
            </div>
          ))}
        </div></div>
    </div>
  );
}

function OwnerPanel() {
  const { userIGN } = useContext(UserContext);
  const isAdmin = userIGN && ADMIN_IGNS.includes(userIGN);

  if (!isAdmin) {
    return <p className="text-center mt-20 text-red-400">Access Denied</p>;
  }

  const payments = JSON.parse(localStorage.getItem("payments") || "[]");

  return (
    <div className="max-w-4xl mx-auto px-6 mt-12">
      <div className="bg-black/60 border border-purple-500 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">👑 Owner Panel – Payments</h2>
        {payments.length === 0 && <p className="text-gray-400">No payments yet</p>}
        {payments.map((p, i) => (
          <div key={i} className="border border-indigo-500 rounded-xl p-4 mb-3">
            <p className="font-bold">IGN: {p.ign}</p>
            <p className="text-sm text-gray-300">Time: {p.time}</p>
            <ul className="text-sm mt-2">
              {p.items.map((it, idx) => (
                <li key={idx}>• {it.name} – ₹{it.price}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoginPage() {
  const { setUserIGN, setAccountType } = useContext(UserContext);
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | register
  const [ign, setIgn] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("premium");

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  const register = () => {
    if (!ign || !password) return alert("Enter IGN and password");
    if (users[ign]) return alert("IGN already registered");

    users[ign] = { password, type };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered successfully. Please login.");
    setMode("login");
  };

  const login = () => {
    if (!ign || !password) return alert("Enter IGN and password");
    if (!users[ign] || users[ign].password !== password) {
      return alert("Invalid IGN or password");
    }
    setUserIGN(ign);
    setAccountType(users[ign].type);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto px-6 mt-20">
      <div className="bg-black/60 border border-purple-500 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          {mode === "login" ? "Login" : "Register"}
        </h2>

        <input
          value={ign}
          onChange={(e) => setIgn(e.target.value)}
          placeholder="Enter IGN"
          className="w-full mb-3 px-3 py-2 rounded bg-white text-black placeholder-gray-500"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-3 px-3 py-2 rounded bg-white text-black"
        />

        {mode === "register" && (
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full mb-4 px-3 py-2 rounded bg-white text-black"
          >
            <option value="premium">Premium</option>
            <option value="cracked">Cracked</option>
          </select>
        )}

        {mode === "login" ? (
          <button onClick={login} className="w-full bg-indigo-600 py-2 rounded-xl font-bold">
            Login
          </button>
        ) : (
          <button onClick={register} className="w-full bg-emerald-600 py-2 rounded-xl font-bold">
            Register
          </button>
        )}

        <p className="mt-4 text-sm text-center text-gray-400">
          {mode === "login" ? (
            <>
              First time here? {" "}
              <button onClick={() => setMode("register")} className="text-indigo-400 font-bold">
                Register
              </button>
            </>
          ) : (
            <>
              Already registered? {" "}
              <button onClick={() => setMode("login")} className="text-indigo-400 font-bold">
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

function CartPage() {
  const { cartItems } = useContext(CartContext);
  const { userIGN } = useContext(UserContext);
  const [showDiscordPopup, setShowDiscordPopup] = useState(false);

  const copyDiscord = () => {
    const payments = JSON.parse(localStorage.getItem("payments") || "[]");
    payments.push({ ign: userIGN, items: cartItems, time: new Date().toLocaleString() });
    localStorage.setItem("payments", JSON.stringify(payments));
    navigator.clipboard.writeText("https://discord.gg/FhnYvNn39q");
    alert("Discord link copied & payment saved!");
  };

  if (cartItems.length === 0) {
    return <p className="text-center mt-20 text-gray-400">Cart is empty</p>;
  }

  return (
    <div className="max-w-md mx-auto px-6 mt-12">
      <div className="bg-black/60 border border-purple-500 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-3">🛒 Cart</h2>
        <div className="mb-2 text-sm text-gray-300">Total: <span className="font-bold text-white">₹{cartItems.reduce((s,i)=>s+i.price,0)}</span></div>
        {cartItems.map((i, idx) => (
          <div key={idx} className="flex justify-between">
            <span>{i.name}</span>
            <span>₹{i.price}</span>
          </div>
        ))}
        <p className="mt-4 text-sm text-gray-400">Scan the QR code below to complete payment. Delivery will be done within 24 hours.</p>
        <div className="mt-4 flex flex-col items-center gap-2">
  <img
    src="https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/qr-jpg-imagetourl.cloud-1768909642924-urkdnj.jpg"
    alt="UPI Payment QR"
    className="w-56 h-56 rounded-xl border border-purple-500"
  />
  
</div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400 mb-3">
            After completing payment, please create a ticket on Discord for delivery.
          </p>
          <button
            onClick={() => setShowDiscordPopup(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 px-6 py-2 rounded-xl font-bold cursor-pointer"
          >
            🎫 Create Ticket (Discord)
          </button>
        </div>

        {showDiscordPopup && (
          <div className="fixed bottom-6 right-6 bg-black border border-purple-500 rounded-xl p-4 w-72 shadow-xl">
            <p className="text-sm mb-2">Click hand icon to copy Discord link</p>
            <div className="flex items-center gap-2">
              <input
                value="https://discord.gg/FhnYvNn39q"
                readOnly
                className="flex-1 px-2 py-1 rounded bg-gray-800 text-white text-sm"
              />
              <button
                onClick={copyDiscord}
                className="bg-indigo-600 px-3 py-1 rounded font-bold text-sm cursor-pointer"
                title="Copy Discord Link"
              >
                🤚
              </button>
            </div>
            <button
              onClick={() => setShowDiscordPopup(false)}
              className="mt-3 text-xs text-gray-400"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function XstreamServerStore() {
  const [loggedUsers, setLoggedUsers] = useState([]);
  const [userIGN, setUserIGN] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (name, price) => setCartItems([{ name, price }]);

  

  return (
    <UserContext.Provider value={{ userIGN, setUserIGN, accountType, setAccountType, loggedUsers, setLoggedUsers }}>
      <CartContext.Provider value={{ cartItems, addToCart, cartCount: cartItems.length }}>
        <Router>
          <div className="min-h-screen text-white" style={{ background: "radial-gradient(circle at top,#3b0764,#020617)" }}>
            <TopBar />
            <Routes>
              <Route path="/" element={<CratesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/rules" element={<RulesPage />} />
              <Route path="/owner" element={<OwnerPanel />} />
              <Route path="/privacy" element={
  <div className="max-w-4xl mx-auto px-6 mt-12">
    <div className="bg-black/60 border border-purple-500 rounded-2xl p-6">
      <h2 className="text-3xl font-bold mb-4">🔒 Privacy & Policy</h2>
      <ul className="list-disc list-inside text-gray-300 space-y-3">
        <li>We do not share user data with third parties.</li>
        <li>Only IGN is collected for in-game delivery.</li>
        <li>Payment verification is done manually via transaction proof.</li>
        <li>No refunds once payment is completed.</li>
        <li>Any misuse or fraud will result in permanent restriction.</li>
        <li>By using this store, you agree to all server rules and policies.</li>
      </ul>
    </div>
  </div>
} />
            </Routes>
          </div>
        </Router>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}
