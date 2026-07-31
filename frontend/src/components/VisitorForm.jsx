import { useEffect, useState } from "react";
import {
  createVisitor,
  updateVisitor,
} from "../services/visitorService";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

const initialState = {
  FullName: "",
  Phone: "",
  Email: "",
  CompanyName: "",
  IDProofType: "",
  IDProofNumber: "",
  Photo: null,
};

const VisitorForm = ({
  open,
  handleClose,
  visitor,
}) => {
  const [formData, setFormData] =
    useState(initialState);

  useEffect(() => {
    if (visitor) {
      setFormData({
        FullName: visitor.FullName || "",
        Phone: visitor.Phone || "",
        Email: visitor.Email || "",
        CompanyName:
          visitor.CompanyName || "",
        IDProofType:
          visitor.IDProofType || "",
        IDProofNumber:
          visitor.IDProofNumber || "",
        Photo: null,
      });
    } else {
      setFormData(initialState);
    }
  }, [visitor, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      Photo: e.target.files[0],
    }));
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      data.append(
        "FullName",
        formData.FullName
      );
      data.append(
        "Phone",
        formData.Phone
      );
      data.append(
        "Email",
        formData.Email
      );
      data.append(
        "CompanyName",
        formData.CompanyName
      );
      data.append(
        "IDProofType",
        formData.IDProofType
      );
      data.append(
        "IDProofNumber",
        formData.IDProofNumber
      );

      if (formData.Photo) {
        data.append(
          "photo",
          formData.Photo
        );
      }

      let response;

      if (visitor) {
        response =
          await updateVisitor(
            visitor.VisitorId,
            data
          );
      } else {
        response =
          await createVisitor(data);
      }

      alert(response.message);

      setFormData(initialState);

      handleClose();
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(
          JSON.stringify(
            error.response.data,
            null,
            2
          )
        );
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {visitor
          ? "Edit Visitor"
          : "Add Visitor"}
      </DialogTitle>

      <DialogContent>
        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
        >
          <Grid
            size={{ xs: 12, md: 6 }}
          >
            <TextField
              fullWidth
              label="Full Name"
              name="FullName"
              value={formData.FullName}
              onChange={handleChange}
            />
          </Grid>

          <Grid
            size={{ xs: 12, md: 6 }}
          >
            <TextField
              fullWidth
              label="Phone"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid
            size={{ xs: 12, md: 6 }}
          >
            <TextField
              fullWidth
              label="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
            />
          </Grid>

          <Grid
            size={{ xs: 12, md: 6 }}
          >
            <TextField
              fullWidth
              label="Company Name"
              name="CompanyName"
              value={formData.CompanyName}
              onChange={handleChange}
            />
          </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="ID Proof Type"
              name="IDProofType"
              value={formData.IDProofType}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="ID Proof Number"
              name="IDProofNumber"
              value={formData.IDProofNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              variant="outlined"
              component="label"
            >
              {formData.Photo
                ? formData.Photo.name
                : "Upload Photo"}

              <input
                hidden
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handlePhotoChange}
              />
            </Button>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            setFormData(initialState);
            handleClose();
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          {visitor
            ? "Update Visitor"
            : "Save Visitor"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VisitorForm;