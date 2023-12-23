import { verifyRequestOrigin } from "lucia";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest): Promise<NextResponse> {
	if (request.method !== "GET") {
		const originHeader = request.headers.get("Origin");
		const hostHeader = request.headers.get("Host");
		if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
			return new NextResponse(null, {
				status: 403
			});
		}
	}
	return NextResponse.next();
}
