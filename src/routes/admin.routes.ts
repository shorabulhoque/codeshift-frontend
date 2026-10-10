const prefix = "/dashboard/admin";

export const adminRoutes = [
    {
        title: "Management",
        items: [
            {
                title: "Overview",
                url: `${prefix}`,
                icon: "LayoutDashboard",
            },
            {
                title: "Recruiters",
                url: `${prefix}/recruiters`,
                icon: "Briefcase",
            },
            {
                title: "Candidates",
                url: `${prefix}/candidates`,
                icon: "Users",
            },
            {
                title: "Payments",
                url: `${prefix}/payments`,
                icon: "CreditCard",
            },
        ],
    }
];
