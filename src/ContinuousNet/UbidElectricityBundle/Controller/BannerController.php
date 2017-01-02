<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\Banner;
use ContinuousNet\UbidElectricityBundle\Form\BannerType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Banner Controller
 * 
 * Manage Banners 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\UbidElectricityBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see		BannerController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/banner")
 */
class BannerController extends BaseController
{
	/**
	 * Lists all Banner entities.
	 *
	 * @Route("/", name="banner_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$banners = $em->getRepository('UbidElectricityBundle:Banner')->findAll();

		return $this->render('UbidElectricityBundle:Banner:index.html.twig', array(
			'banners' => $banners,
		));
	}

	/**
	 * Creates a new Banner entity.
	 *
	 * @Route("/new", name="banner_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$banner = new Banner();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\BannerType', $banner);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($banner);
			$em->flush();

			return $this->redirectToRoute('banner_show', array('id' => $banner->getId()));
		}

		return $this->render('UbidElectricityBundle:Banner:new.html.twig', array(
			'banner' => $banner,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Banner entity.
	 *
	 * @Route("/{id}", name="banner_show")
	 * @Method("GET")
	 */
	public function showAction(Banner $banner)
	{
		$deleteForm = $this->createDeleteForm($banner);

		return $this->render('UbidElectricityBundle:Banner:show.html.twig', array(
			'banner' => $banner,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Banner entity.
	 *
	 * @Route("/{id}/edit", name="banner_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Banner $banner)
	{
		$deleteForm = $this->createDeleteForm($banner);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\BannerType', $banner);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($banner);
			$em->flush();

			return $this->redirectToRoute('banner_edit', array('id' => $banner->getId()));
		}

		return $this->render('UbidElectricityBundle:Banner:edit.html.twig', array(
			'banner' => $banner,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Banner entity.
	 *
	 * @Route("/{id}", name="banner_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Banner $banner)
	{
		$form = $this->createDeleteForm($banner);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($banner);
			$em->flush();
		}

		return $this->redirectToRoute('banner_index');
	}

	/**
	 * Creates a form to delete a Banner entity.
	 *
	 * @param Banner $banner The Banner entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Banner $banner)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('banner_delete', array('id' => $banner->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
