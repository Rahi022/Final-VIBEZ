exports.signin = async (req, res) => {
    const { email, password } = req.body;
  
    console.log('Signin Request Body:', req.body);
  
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        console.log('User not found:', email);
        return res.status(404).json({ error: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Invalid password for:', email);
        return res.status(400).json({ error: "Invalid email or password" });
      }
  
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      console.log('Generated Token:', token);
  
      res.status(200).json({
        message: "Login successful",
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
    } catch (error) {
      console.error('Signin Error:', error.message);
      res.status(500).json({ error: "Something went wrong. Please try again." });
    }
  };  