import { Request, Response } from "express";

import Lead from "../models/Lead";

export const createLead = async (req: Request, res: Response) => {
  try {
    const { name, email, source } = req.body;

    const lead = await Lead.create({
      name,
      email,
      source,
    });

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create lead",
    });
  }
};

export const getLeads = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = 10;

    const status = req.query.status as string;

    const source = req.query.source as string;

    const search = req.query.search as string;

    const sort = req.query.sort as string;

    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (source) {
      query.source = source;
    }

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    let sortOption = {};

    if (sort === "oldest") {
      sortOption = {
        createdAt: 1,
      };
    } else {
      sortOption = {
        createdAt: -1,
      };
    }

    const leads = await Lead.find(query)

      .sort(sortOption)

      .skip((page - 1) * limit)

      .limit(limit);

    const total = await Lead.countDocuments(query);

    res.status(200).json({
      leads,

      currentPage: page,

      totalPages: Math.ceil(total / limit),

      totalLeads: total,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch leads",
    });
  }
};

export const getSingleLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch lead",
    });
  }
};

export const updateLead = async (req: Request, res: Response) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,

      req.body,

      {
        new: true,
      },
    );

    if (!updatedLead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update lead",
    });
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    await lead.deleteOne();

    res.status(200).json({
      message: "Lead deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete lead",
    });
  }
};
