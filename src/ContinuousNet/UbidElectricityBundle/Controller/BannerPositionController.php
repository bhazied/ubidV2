<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\BannerPosition;
use ContinuousNet\UbidElectricityBundle\Form\BannerPositionType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Banner Position Controller
 * 
 * Manage BannerPositions 
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
 * @see		BannerPositionController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/bannerposition")
 */
class BannerPositionController extends BaseController
{
	/**
	 * Lists all BannerPosition entities.
	 *
	 * @Route("/", name="bannerposition_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$bannerPositions = $em->getRepository('UbidElectricityBundle:BannerPosition')->findAll();

		return $this->render('UbidElectricityBundle:BannerPosition:index.html.twig', array(
			'bannerPositions' => $bannerPositions,
		));
	}

	/**
	 * Creates a new BannerPosition entity.
	 *
	 * @Route("/new", name="bannerposition_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$bannerPosition = new BannerPosition();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\BannerPositionType', $bannerPosition);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($bannerPosition);
			$em->flush();

			return $this->redirectToRoute('bannerposition_show', array('id' => $bannerPosition->getId()));
		}

		return $this->render('UbidElectricityBundle:BannerPosition:new.html.twig', array(
			'bannerPosition' => $bannerPosition,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a BannerPosition entity.
	 *
	 * @Route("/{id}", name="bannerposition_show")
	 * @Method("GET")
	 */
	public function showAction(BannerPosition $bannerPosition)
	{
		$deleteForm = $this->createDeleteForm($bannerPosition);

		return $this->render('UbidElectricityBundle:BannerPosition:show.html.twig', array(
			'bannerPosition' => $bannerPosition,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing BannerPosition entity.
	 *
	 * @Route("/{id}/edit", name="bannerposition_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, BannerPosition $bannerPosition)
	{
		$deleteForm = $this->createDeleteForm($bannerPosition);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\BannerPositionType', $bannerPosition);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($bannerPosition);
			$em->flush();

			return $this->redirectToRoute('bannerposition_edit', array('id' => $bannerPosition->getId()));
		}

		return $this->render('UbidElectricityBundle:BannerPosition:edit.html.twig', array(
			'bannerPosition' => $bannerPosition,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a BannerPosition entity.
	 *
	 * @Route("/{id}", name="bannerposition_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, BannerPosition $bannerPosition)
	{
		$form = $this->createDeleteForm($bannerPosition);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($bannerPosition);
			$em->flush();
		}

		return $this->redirectToRoute('bannerposition_index');
	}

	/**
	 * Creates a form to delete a BannerPosition entity.
	 *
	 * @param BannerPosition $bannerPosition The BannerPosition entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(BannerPosition $bannerPosition)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('bannerposition_delete', array('id' => $bannerPosition->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
