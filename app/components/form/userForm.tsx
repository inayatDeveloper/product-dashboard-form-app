"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function UserForm() {
    const [success, setSuccess] = useState(false);

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            phone: "",
            password: "",
        },

        validationSchema: Yup.object({
            fullName: Yup.string()
                .required("Full name is required"),

            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),

            phone: Yup.string()
                .required("Phone number is required"),

            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
        }),

        onSubmit: (values, { resetForm }) => {
            console.log(values);
            setSuccess(true);

            setTimeout(() => setSuccess(false), 3000);

            resetForm();
        },
    });

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

            <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-6">

                {/* TITLE */}
                <h1 className="text-2xl font-bold text-gray-800 mb-1">
                    User Registration
                </h1>

                <p className="text-sm text-gray-500 mb-6">
                    Fill the form below to continue
                </p>

                {/* SUCCESS MESSAGE */}
                {success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
                        🎉 Form submitted successfully!
                    </div>
                )}

                <form onSubmit={formik.handleSubmit} className="space-y-4">

                    {/* FULL NAME */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            onChange={formik.handleChange}
                            value={formik.values.fullName}
                            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                        {formik.touched.fullName && formik.errors.fullName && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.fullName}
                            </p>
                        )}
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.email}
                            </p>
                        )}
                    </div>

                    {/* PHONE */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phone"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.phone}
                            </p>
                        )}
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.password}
                            </p>
                        )}
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}