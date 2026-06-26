--
-- PostgreSQL database dump
--

\restrict Yg2OnDsnIAGtmaNDumPjsmQfpT5EjqRVIG3xGcY3FgD8tAA2WokZpbfEVs1eWiz

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: modulos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modulos (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    creado_en timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.modulos OWNER TO postgres;

--
-- Name: modulos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.modulos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.modulos_id_seq OWNER TO postgres;

--
-- Name: modulos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.modulos_id_seq OWNED BY public.modulos.id;


--
-- Name: videos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.videos (
    id integer NOT NULL,
    titulo character varying(200) NOT NULL,
    url character varying(300) NOT NULL,
    youtube_id character varying(20) NOT NULL,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    creado_en timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    modulo_id integer
);


ALTER TABLE public.videos OWNER TO postgres;

--
-- Name: videos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.videos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.videos_id_seq OWNER TO postgres;

--
-- Name: videos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.videos_id_seq OWNED BY public.videos.id;


--
-- Name: modulos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modulos ALTER COLUMN id SET DEFAULT nextval('public.modulos_id_seq'::regclass);


--
-- Name: videos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos ALTER COLUMN id SET DEFAULT nextval('public.videos_id_seq'::regclass);


--
-- Data for Name: modulos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modulos (id, nombre, creado_en) FROM stdin;
1	Módulo Tesis	2026-06-26 14:49:52.42735
3	Módulo Matrícula	2026-06-26 15:36:14.037021
5	Módulo Prueba	2026-06-26 16:15:13.2002
\.


--
-- Data for Name: videos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.videos (id, titulo, url, youtube_id, fecha, creado_en, modulo_id) FROM stdin;
1	Registro de Plan de Tesis	https://www.youtube.com/watch?v=IhGvxbFmR5s	IhGvxbFmR5s	2026-06-26 12:11:15.426898	2026-06-26 12:11:15.426898	1
2	Aprobar Borrador de Tesis	https://www.youtube.com/watch?v=_ClHff0RBts	_ClHff0RBts	2026-06-26 13:01:34.397979	2026-06-26 13:01:34.397979	1
3	Asignación de Dictaminadores	https://www.youtube.com/watch?v=Ur27Qr46Jss	Ur27Qr46Jss	2026-06-26 13:04:50.740536	2026-06-26 13:04:50.740536	1
4	Observación de Plan de Tesis	https://www.youtube.com/watch?v=5AJOT3VsYfc	5AJOT3VsYfc	2026-06-26 13:05:22.519714	2026-06-26 13:05:22.519714	1
5	Levantar Observaciones	https://www.youtube.com/watch?v=Ov-RX72Lzfk	Ov-RX72Lzfk	2026-06-26 13:05:38.983168	2026-06-26 13:05:38.983168	1
6	Aprobación del Plan de Tesis	https://www.youtube.com/watch?v=K3AooWiMFng	K3AooWiMFng	2026-06-26 13:06:02.851351	2026-06-26 13:06:02.851351	1
7	Asignación de Asesor de Tesis	https://www.youtube.com/watch?v=sKXGYNdw0wE	sKXGYNdw0wE	2026-06-26 13:06:35.009003	2026-06-26 13:06:35.009003	1
8	Fin de Asesoría	https://www.youtube.com/watch?v=L0g7Ik8no0Y	L0g7Ik8no0Y	2026-06-26 13:06:50.606286	2026-06-26 13:06:50.606286	1
10	Asignación del Tercer Jurado	https://www.youtube.com/watch?v=RhP28BOn7R8	RhP28BOn7R8	2026-06-26 13:08:33.488979	2026-06-26 13:08:33.488979	1
11	Registro de Sustentación	https://www.youtube.com/watch?v=lWF0hYQnPdA	lWF0hYQnPdA	2026-06-26 13:09:00.017741	2026-06-26 13:09:00.017741	1
12	Gestión de Calidad	https://www.youtube.com/watch?v=B43LhhMSe8Q	B43LhhMSe8Q	2026-06-26 13:09:42.163236	2026-06-26 13:09:42.163236	1
13	Seguimiento de Metas	https://www.youtube.com/watch?v=eUTECWjkrA8	eUTECWjkrA8	2026-06-26 13:09:57.951394	2026-06-26 13:09:57.951394	1
14	Investigación, Desarrollo e Innovación	https://www.youtube.com/watch?v=-9sAEqtY3rA	-9sAEqtY3rA	2026-06-26 13:10:24.730661	2026-06-26 13:10:24.730661	1
16	Tutorial de Matrículas 2025 | UCSM	https://www.youtube.com/watch?v=pl3ssg-QJOY	pl3ssg-QJOY	2026-06-26 16:03:38.740465	2026-06-26 16:03:38.740465	3
17	Instructivo Matrículas Ingresantes 2023 | UCSM	https://www.youtube.com/watch?v=yORagXeE1zk	yORagXeE1zk	2026-06-26 16:04:37.205954	2026-06-26 16:04:37.205954	3
19	Prueba	https://www.youtube.com/watch?v=gucomuRQAjk	gucomuRQAjk	2026-06-26 16:15:28.879867	2026-06-26 16:15:28.879867	5
\.


--
-- Name: modulos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modulos_id_seq', 5, true);


--
-- Name: videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.videos_id_seq', 19, true);


--
-- Name: modulos modulos_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modulos
    ADD CONSTRAINT modulos_nombre_key UNIQUE (nombre);


--
-- Name: modulos modulos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modulos
    ADD CONSTRAINT modulos_pkey PRIMARY KEY (id);


--
-- Name: videos videos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (id);


--
-- Name: videos fk_modulo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT fk_modulo FOREIGN KEY (modulo_id) REFERENCES public.modulos(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict Yg2OnDsnIAGtmaNDumPjsmQfpT5EjqRVIG3xGcY3FgD8tAA2WokZpbfEVs1eWiz

