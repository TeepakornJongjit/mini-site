export default function AboutPage() {
    return (
        <>
            <h2 className="mb-3 text-2xl font-bold">About WU Canteen</h2>
            <p className="mb-2 text-gray-600">
                WU Canteen serves the Walailak University community with fresh, affordable meals every day.
            </p>
            <p className="text-gray-600">Open Mon–Fri 07:00–19:00, Sat–Sun 08:00–15:00.</p>
            <div className="mt-5">
                <iframe
                    title="Map showing Walailak University"
                    src="https://www.google.com/maps?q=Walailak+University,+Nakhon+Si+Thammarat,+Thailand&output=embed"
                    className="h-64 w-full rounded-md border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </>
    );
}