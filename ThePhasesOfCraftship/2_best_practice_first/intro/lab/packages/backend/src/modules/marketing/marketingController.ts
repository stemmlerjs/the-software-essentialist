
import express from 'express';
import { Errors } from '../../shared/errors/errors';
import { Application } from '../../shared/application/applicationInterface'

export class MarketingController {

  constructor (private application: Application) {
  }

  async addToList (req: express.Request, res: express.Response) {
    try {
      const { email } = req.body;
      
      await this.application.marketing.addEmailToList(email);
  
      return res.json({ error: undefined, data: undefined, success: true });
    } catch (error) {
      return res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }

}