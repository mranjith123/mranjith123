import React from "react";
import './leadPage.css';
import { Box, Paper, Tab, } from "@material-ui/core";
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';


import { useNavigate, Outlet, useHistory } from "react-router-dom";
const LeadHomepage = (props) => {

    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    }));

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, .05)'
                : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));


    const navigate = useNavigate();

    const handleCreateLead = () => {
        navigate("/createLeadPage");
    }

    const handleModifyLead = () => {
        navigate("/viewLeadPage");
    }
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    

    return (
        <Box>
            <Paper
                variant="outlined"
                square
            // style={{ backgroundColor: "#c4dbda"}}
            >
                <div style={{overflow:"hidden"}}>
                    <Drawer variant="permanent" open="true"
                        PaperProps={{
                            sx: {
                                height: {
                                    top: 64,
                                    width: 252

                                }
                            }
                        }}>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{ backgroundColor: "#c4dbda" }}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" className="lead-accordian">
                                <Typography style={{ fontSize: "20px", color: "#cb3f26" }}>Lead Management</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="lead-accordetails">
                                <Typography onClick={handleCreateLead}>
                                    Create Lead <DoubleArrowIcon style={{ width: "10px", float: "right" }} />
                                </Typography>
                            </AccordionDetails>
                            <AccordionDetails className="lead-accordetails">
                                <Typography onClick={handleModifyLead}>
                                    Modify Lead <DoubleArrowIcon style={{ width: "10px", float: "right" }} />
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Divider />
                    </Drawer>
                </div>
            </Paper>
        </Box>
    );
}

export default LeadHomepage;