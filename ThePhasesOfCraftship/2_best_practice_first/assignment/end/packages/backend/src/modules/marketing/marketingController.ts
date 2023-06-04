
import express from 'express';
import { Errors } from '../../shared/errors/errors';
import { MarketingService } from './marketingService';

export class MarketingController {

  constructor (private marketingService: MarketingService) {
  }

  async addToList (req: express.Request, res: express.Response) {
    try {
      const { email } = req.body;
      
      await this.marketingService.addEmailToList(email);
  
      return res.json({ error: undefined, data: undefined, success: true });
    } catch (error) {
      return res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }

}