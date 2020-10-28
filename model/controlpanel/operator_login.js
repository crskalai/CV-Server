import operatorloginparams from "../common/operatorloginparams";

const Login ={
    /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  login(req, res) {
    if (!req.body.success && !req.body.lowPoint && !req.body.takeAway) {
      return res.status(400).send({'message': 'All fields are required'})
    }
    const reflection = ReflectionModel.create(req.body);
    return res.status(201).send(reflection);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} reflections array
   */
  relogin(req, res) {
 
    return res.status(200).send("Hell Relogin");
  }
}